import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PageCarOptionsDto } from 'src/common/pageDTO/page-car-options.dto';
import { PageDto } from 'src/common/pageDTO/page.dto';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { CreateCarDto } from './dto/car-create.dto';
import { CarEntity } from './entity/car.entity';
import { CarRepository } from './repository/car.repository';

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createCar(
    createCarDto: CreateCarDto,
    file: any,
  ): Promise<CreateCarDto> {
    if (file) {
      const imagaUrl = await this.cloudinaryService.uploadImage(file);
      createCarDto.image = imagaUrl.url;
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
    const car = await this.carRepository.getCarById(id);
    if (!car) {
      throw new HttpException('car not found', HttpStatus.NOT_FOUND);
    }
    return car;
  };

  updateCar = async (id: number, updateCarDto: CreateCarDto): Promise<void> => {
    const car = await this.carRepository.getCarById(id);
    if (!car) {
      throw new HttpException('car not found', HttpStatus.NOT_FOUND);
    }
    return await this.carRepository.updateCar(id, updateCarDto);
  };

  deleteCar = async (id: number): Promise<any> => {
    const car = await this.carRepository.getCarById(id);
    if (!car) {
      throw new HttpException('car not found', HttpStatus.NOT_FOUND);
    }
    await this.carRepository.delete(id);
    return new HttpException('delete successfully', HttpStatus.OK);
  };
}
