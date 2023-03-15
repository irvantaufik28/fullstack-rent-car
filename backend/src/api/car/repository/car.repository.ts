import { InjectRepository } from '@nestjs/typeorm';
import { PageCarOptionsDto } from 'src/common/pageDTO/page-car-options.dto';
import { PageMetaDto } from 'src/common/pageDTO/page-meta.dto';
import { PageDto } from 'src/common/pageDTO/page.dto';
import { Repository } from 'typeorm';
import { CreateCarDto } from '../dto/car-create.dto';
import { CarEntity } from '../entity/car.entity';

export class CarRepository extends Repository<CarEntity> {
  constructor(
    @InjectRepository(CarEntity)
    private carRepository: Repository<CarEntity>,
  ) {
    super(
      carRepository.target,
      carRepository.manager,
      carRepository.queryRunner,
    );
  }

  getAllCarPagination = async (
    pageOptionsDto: PageCarOptionsDto,
  ): Promise<PageDto<CreateCarDto>> => {
    const queryBuilder = this.carRepository.createQueryBuilder('car');

    if (pageOptionsDto.name) {
      queryBuilder.andWhere('LOWER(car.name) LIKE :name', {
        name: `%${pageOptionsDto.name.toLowerCase()}%`,
      });
    }

    if (pageOptionsDto.category) {
      queryBuilder.andWhere('car.category = :category', {
        category: `${pageOptionsDto.category.toLowerCase()}`,
      });
    }
    if (pageOptionsDto.isRented) {
      queryBuilder.andWhere('car.status = :isRented', {
        isRented: `${pageOptionsDto.isRented.toLocaleLowerCase()}`,
      });
    }

    if (pageOptionsDto.maxPrice) {
      queryBuilder.andWhere(':maxPrice >= car.price', {
        maxPrice: pageOptionsDto.maxPrice,
      });
    }
    
    if (pageOptionsDto.minPrice) {
      queryBuilder.andWhere(':minPrice <= car.price', {
        minPrice: pageOptionsDto.minPrice,
      });
    }

    queryBuilder
      .orderBy('car.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  };

  getCarById = async (id: number, options: object = {}): Promise<CarEntity> => {
    const car = this.carRepository.findOne({
      where: {
        id,
      },
      relations: options,
    });
    return car;
  };

  createCar = async (createCarDto: CreateCarDto): Promise<CreateCarDto> => {
    const { name, category, price, image } = createCarDto;
    const car = createCarDto;

    car.name = name;
    car.category = category;
    car.price = price;
    car.image = image;

    return await this.carRepository.save(car);
  };

  updateCar = async (id: number, updateCarDto: CreateCarDto): Promise<any> => {
    return await this.carRepository.update(id, updateCarDto);
  };

  deleteCar = async (id: number): Promise<any> => {
    return await this.carRepository.delete(id);
  };
}
