import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarService } from '../car/car.service';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { CarMediaEntity } from 'src/database/entities/car-media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { readFileSync } from 'fs';

@Injectable()
export class CarMediaService {
  constructor(
    private readonly carService: CarService,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(CarMediaEntity)
    private readonly carMediaRepository: Repository<CarMediaEntity>,
  ) {}

  async uploadCarImage(
    uploadImageDto: UploadImageDto,
    files: any,
  ): Promise<CarMediaEntity> {
    console.log(files)
    const car = await this.carService.getCarById(uploadImageDto.car_id);
    if (!car) {
      throw new HttpException('car not found', HttpStatus.NOT_FOUND);
    }
    if (files) {
      const fileBuffers = await Promise.all(
        files.map((file: any) => readFileSync(file.path)),
      );

      for (let i = 0; i < fileBuffers.length; i++) {
        const fileBuffer = fileBuffers[i];
        const image = await this.cloudinaryService.uploadImage(fileBuffer);
        const newUploadImageDto = {
          ...uploadImageDto,
          image_url: image.url,
          is_main_image: false,
        };
        await this.carMediaRepository.save(newUploadImageDto);
      }
      const images = await this.carMediaRepository.find({
        where: { car_id: car.id },
      });

      const mainImage = images.find((o) => o.is_main_image === true);

      if (!mainImage) {
        const newMainImage = {
          is_main_image: true,
        };
        await this.carMediaRepository.update(images[0].id, newMainImage);
      }
      return;
    }
  }
}
