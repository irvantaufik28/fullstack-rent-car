import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarEntity } from 'src/database/entities/car.entity';
import { CarRepository } from '../car/repository/car.repository';
import { EventsGateway } from 'src/common/events/events.gateway'; 
import { NotificationsEntity } from 'src/database/entities/notification.entity'; 
import { NotificationService } from '../notification/notification.service';
import { NotificationRepository } from '../notification/repository/notification.repository';
import { OrderProducerService } from 'src/jobs/queue/producer/order.produce.service'; 
import { OrderEntity } from 'src/database/entities/order.entity'; 
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderRepository } from './repository/order.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, CarEntity, NotificationsEntity]),
    BullModule.forRoot({
      redis: {
        host: "containers-us-west-177.railway.app",
        port: 6385,
        password: "wMTy25uuSLvjoUdjrJRe",
        username: "default",
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
