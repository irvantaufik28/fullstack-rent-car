import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from '../authentication/auth.module';
import { CarModule } from './car/car.module';
import { QueueModule } from 'src/jobs/queue/queue.module'; 
import { OrderModule } from './order/order.module';
import { EventsModule } from 'src/common/events/events.module'; 
import { NotificationModule } from './notification/notification.module';
import { CloudinaryModule } from 'src/common/cloudinary/cloudinary.module'; 
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { CarMediaModule } from './car_media/car_media.module';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { SlipModule } from './slip/slip.module';
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
    CustomerAddressModule,
    MailModule,
    OtpModule,
    MailerModule.forRoot({
      transport: {
       host: process.env.MAILER_SMTP_HOST,
       port: parseInt( process.env.MAILER_SMTP_PORT),
       secure: process.env.MAILER_SECURE === "true",
       auth: {
         user: process.env.MAILER_AUTH_USER,
         pass: process.env.MAILER_AUTH_PASSWORD
       }
      }
     }),
    CarMediaModule,
    UploadModule,
    SlipModule,
   
  ],
  providers: [],
})
export class ApiModule {}
