import { InjectRepository } from '@nestjs/typeorm';
import { PageCarOptionsDto } from 'src/common/pageDTO/page-car-options.dto';
import { PageMetaDto } from 'src/common/pageDTO/page-meta.dto';
import { PageDto } from 'src/common/pageDTO/page.dto';
import { CarMediaEntity } from 'src/database/entities/car-media.entity';
import { CarEntity } from 'src/database/entities/car.entity';
import { Repository } from 'typeorm';
import { UploadImageDto } from '../dto/upload-image.dto';


export class CarMediaReposity extends Repository<CarMediaEntity> {
  constructor(
    @InjectRepository(CarEntity)
    private carMediaReposity: Repository<CarMediaEntity>,
  ) {
    super(
      carMediaReposity.target,
      carMediaReposity.manager,
      carMediaReposity.queryRunner,
    );
  }

  
  createCar = async (createCarDto: UploadImageDto ): Promise<UploadImageDto> => {
    const { car_id, is_main_image, image_url } = createCarDto;
    const car = createCarDto;

    car.car_id = car_id;
    car.is_main_image = is_main_image;
    car.image_url = image_url;

    return await this.carMediaReposity.save(car);
  };

//   updateCar = async (id: number, updateCarDto: UpdateCarDto): Promise<any> => {
//     const { name, category, price, image } = updateCarDto;
//     const updatedCar = {
//       name,
//       category,
//       price,
//       image,
//     };
//     return await this.carMediaReposity.update(id, updatedCar);
//   };

  deleteCar = async (id: number): Promise<any> => {
    return await this.carMediaReposity.delete(id);
  };
}
