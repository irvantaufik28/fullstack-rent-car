import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { UserEntity } from '../user/entity/user.entity';
import { NotificationsEntity } from './entity/notification.entity';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseGuards(JwGuard)
  async getAllNotificationByUserId(
    @GetUser() req: UserEntity,
  ): Promise<NotificationsEntity[]> {
    const result = await this.notificationService.getAllNotificationByUserId(
      req.id,
    );
    return result;
  }
}
