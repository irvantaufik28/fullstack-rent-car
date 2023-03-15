import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from 'src/common/events/events.gateway'; 
import { NotificationsEntity } from './entity/notification.entity';
import { NotificationService } from './notification.service';
import { NotificationRepository } from './repository/notification.repository';
import { NotificationController } from './notification.controller';

@Module({
 imports: [TypeOrmModule.forFeature([NotificationsEntity])],
 providers: [NotificationService, NotificationRepository, EventsGateway],
 controllers: [NotificationController],
})
export class NotificationModule {}
