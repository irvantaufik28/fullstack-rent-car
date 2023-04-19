import { Module } from '@nestjs/common';
import { CarMediaService } from './car_media.service';
import { CarMediaController } from './car_media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from 'src/database/entities/car.entity';
import { CarRepository } from '../car/repository/car.repository';
import { CarService } from '../car/car.service';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { CarDetailEntity } from 'src/database/entities/car-detail.entity';
import { CarMediaEntity } from 'src/database/entities/car-media.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity, CarDetailEntity, CarMediaEntity]),
  ],
  providers: [CarMediaService, CarRepository, CarService, CloudinaryService],
  controllers: [CarMediaController],
})
export class CarMediaModule {}
