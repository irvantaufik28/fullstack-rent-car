import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from 'src/database/entities/car.entity';
import { CarRepository } from './repository/car.repository';
import { CarProducerService } from 'src/jobs/queue/producer/car.produce.service';
import { BullModule } from '@nestjs/bull';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { CloudinaryProvider } from 'src/common/cloudinary/cloudinary.provider';
import { CarMediaEntity } from 'src/database/entities/car-media.entity';
import { CarDetailEntity } from 'src/database/entities/car-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity, CarMediaEntity, CarDetailEntity]),
  BullModule.forRoot({
    redis: {
      host: "containers-us-west-177.railway.app",
      port: 6385,
      password: "wMTy25uuSLvjoUdjrJRe",
      username: "default",
    },
  }),
  BullModule.registerQueue({
    name: 'car-queue',
  }),
], 
  providers: [CarService, CarRepository, CarProducerService, CloudinaryService, CloudinaryProvider],
  controllers: [CarController],
  exports: [CarRepository, CarService]
})
export class CarModule {}
