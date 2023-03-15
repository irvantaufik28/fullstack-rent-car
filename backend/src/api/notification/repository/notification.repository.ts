import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { NotificationsEntity } from '../entity/notification.entity';

export class NotificationRepository extends Repository<NotificationsEntity> {
  constructor(
    @InjectRepository(NotificationsEntity)
    private notificationRepository: Repository<NotificationsEntity>,
  ) {
    super(
      notificationRepository.target,
      notificationRepository.manager,
      notificationRepository.queryRunner,
    );
  }

  createNotication = async (
    createNotificationDto: CreateNotificationDto,
  ): Promise<any> => {
    const { recipient_id, sender_id, content } = createNotificationDto;
    const notif = createNotificationDto;

    notif.recipient_id = recipient_id;
    notif.sender_id = sender_id;
    notif.content = content;

    return await this.notificationRepository.save(notif);
  };
}
