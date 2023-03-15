import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from '../authentication/auth.module';
import { CarModule } from './car/car.module';
import { QueueModule } from 'src/jobs/queue/queue.module'; 
import { OrderModule } from './order/order.module';
import { EventsModule } from 'src/common/events/events.module'; 
import { NotificationModule } from './notification/notification.module';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module'; 
@Module({
  imports: [
    UserModule,
    AuthModule,
    CarModule,
    QueueModule,
    OrderModule,
    EventsModule,
    NotificationModule,
    CloudinaryModule,
  ],
  providers: [],
})
export class ApiModule {}
