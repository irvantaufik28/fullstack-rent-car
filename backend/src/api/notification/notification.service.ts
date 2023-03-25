import { Injectable } from '@nestjs/common';
import { EventsGateway } from 'src/common/events/events.gateway';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsEntity } from 'src/database/entities/notification.entity';
import { NotificationRepository } from './repository/notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly eventGateway: EventsGateway,
  ) {}

  async getAllNotificationByUserId(id: number): Promise<NotificationsEntity[]> {
    const notif = await this.notificationRepository.find({
      where: {
        sender_id : id,
      },
    });
    return notif;
  }

  async createNotif(
    createNotificationDto: CreateNotificationDto,
  ): Promise<any> {
    const notif = await this.notificationRepository.createNotication(
      createNotificationDto,
    );
    this.eventGateway.sendMessage(notif);
    return notif;
  }
}
