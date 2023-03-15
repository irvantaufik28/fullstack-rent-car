import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from '../car/entity/car.entity';
import { CarRepository } from '../car/repository/car.repository';
import { EventsGateway } from 'src/common/events/events.gateway'; 
import { NotificationsEntity } from '../notification/entity/notification.entity';
import { NotificationService } from '../notification/notification.service';
import { NotificationRepository } from '../notification/repository/notification.repository';
import { OrderProducerService } from 'src/jobs/queue/producer/order.produce.service'; 
import { OrderEntity } from './entity/order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './repository/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, CarEntity, NotificationsEntity]),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerQueue({
      name: 'order-queue',
    }),
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    CarRepository,
    OrderProducerService,
    NotificationService,
    NotificationRepository,
    EventsGateway,
  ],
})
export class OrderModule {}
