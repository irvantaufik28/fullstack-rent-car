import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CarService } from '../car/car.service';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { CarMediaEntity } from 'src/database/entities/car-media.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    file: any,
  ): Promise<CarMediaEntity> {

    const car = await this.carService.getCarById(uploadImageDto.car_id);
    if (!car) {
      throw new HttpException('car not found', HttpStatus.NOT_FOUND);
    }

    if (file) {
      const isMainImage = car?.car_media?.length <= 0;
      const image = await this.cloudinaryService.uploadImage(file);
      uploadImageDto.image_url = image.url;
      uploadImageDto.is_main_image = isMainImage;
      return await this.carMediaRepository.save(uploadImageDto);
    }
  }
}
