import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { CarCounsumer } from './consumer/car.consumer';
import { CarProducerService } from './producer/car.produce.service';
import { CarRepository } from '../car/repository/car.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../car/entity/car.entity';
import { CarService } from '../car/car.service';
import { OrderService } from '../order/order.service';
import { OrderRepository } from '../order/repository/order.repository';
import { OrderEntity } from '../order/entity/order.entity';
import { NotificationService } from '../notification/notification.service';
import { NotificationsEntity } from '../notification/entity/notification.entity';
import { NotificationRepository } from '../notification/repository/notification.repository';
import { EventsGateway } from '../events/events.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity, OrderEntity, NotificationsEntity]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
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
    CarCounsumer,
    CarProducerService,
    CarService,
    CarRepository,
    OrderService,
    OrderRepository,
    NotificationService,
    NotificationRepository,
    EventsGateway,
  ],
  controllers: [],
})
export class QueueModule {}