import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PageCarOptionsDto } from 'src/common/pageDTO/page-car-options.dto';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { CreateCarDto } from './dto/car-create.dto';
import { CarEntity } from 'src/database/entities/car.entity';
import { CarRepository } from './repository/car.repository';
import { UpdateCarDto } from './dto/car-update.dto ';
import { InjectRepository } from '@nestjs/typeorm';
import { CarDetailEntity } from 'src/database/entities/car-detail.entity';
import { Repository } from 'typeorm';
import { CarMediaEntity } from 'src/database/entities/car-media.entity';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly cloudinaryService: CloudinaryService,
    @InjectRepository(CarDetailEntity)
    private readonly carDetailRepository: Repository<CarDetailEntity>,
    @InjectRepository(CarMediaEntity)
    private readonly carMediaReposiroty: Repository<CarMediaEntity>,
  ) {}

  async createCar(
    createCarDto: CreateCarDto,
    file: any,
  ): Promise<CreateCarDto> {
    if (file) {
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      createCarDto.image = imageUrl.url;
    }

    return await this.carRepository.createCar(createCarDto);
  }

  async getAllCarPage(pageOptionsDto: PageCarOptionsDto): Promise<any> {
    const result = await this.carRepository.getAllCarPagination(pageOptionsDto);
    const res = {
      page: result.meta.page,
      pageSize: result.meta.take,
      pageCount: result.meta.pageCount,
      Count: result.meta.itemCount,
      cars: result.cars,
    };
    return res;
  }

  getCarById = async (id: number): Promise<CarEntity> => {
    const include = {
      car_media: true,
      car_detail: true,
    };
    const car = await this.carRepository.getCarById(id, include);
    if (!car) {
      throw new HttpException('car not found', HttpStatus.NOT_FOUND);
    }
    return car;
  };

  updateCar = async (
    id: number,
    updateCarDto: UpdateCarDto,
    file: any,
  ): Promise<void> => {
    if (file) {
      const imageUrl = await this.cloudinaryService.uploadImage(file);
      updateCarDto.image = imageUrl.url;
    }
    const car = await this.carRepository.getCarById(id);
    if (!car) {
      throw new HttpException('car not found', HttpStatus.NOT_FOUND);
    }

    return await this.carRepository.updateCar(id, updateCarDto);
  };

  deleteCar = async (id: number): Promise<any> => {
    const car = await this.getCarById(id);

    if (!car) {
      throw new HttpException('car not found', HttpStatus.NOT_FOUND);
    }

    if(car.car_detail) {
      await this.carDetailRepository.delete(car.car_detail.id);

    }

    const carImages = await this.carMediaReposiroty.find({
      where: {
        car_id: car.id,
      },
    });

    if (carImages) {
      for (const carImage of carImages) {
        await this.carMediaReposiroty.delete(carImage.id);
      }
    }
    await this.carRepository.delete(id);
    return new HttpException('delete successfully', HttpStatus.OK);
  };
}
