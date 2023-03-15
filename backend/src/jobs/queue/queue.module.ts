import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CarCounsumer } from './consumer/car.consumer';
import { CarProducerService } from './producer/car.produce.service';
import { CarRepository } from 'src/api/car/repository/car.repository'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from 'src/entities/car.entity';  
import { CarService } from 'src/api/car/car.service'; 
import { OrderService } from 'src/api/order/order.service'; 
import { OrderRepository } from 'src/api/order/repository/order.repository'; 
import { OrderEntity } from 'src/entities/order.entity';  
import { NotificationService } from 'src/api/notification/notification.service'; 
import { NotificationsEntity } from 'src/entities/notification.entity';
import { NotificationRepository } from 'src/api/notification/repository/notification.repository'; 
import { EventsGateway } from 'src/common/events/events.gateway';
import { OrderCounsumer } from './consumer/order.consumer';
import { OrderProducerService } from './producer/order.produce.service';
import { CloudinaryProvider } from 'src/common/cloudinary/cloudinary.provider'; 
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity, OrderEntity, NotificationsEntity]),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue(
      {
        name: 'car-queue',
      },
      {
        name: 'order-queue',
      },
    ),
  ],
  exports: [CarCounsumer, CarProducerService],
  providers: [
    OrderCounsumer, OrderProducerService,
    CarCounsumer,
    CarProducerService,
    CarService,
    CarRepository,
    OrderService,
    OrderRepository,
    NotificationService,
    NotificationRepository,
    EventsGateway,
    CloudinaryProvider,
    CloudinaryService
  ],
  controllers: [],
})
export class QueueModule {}
