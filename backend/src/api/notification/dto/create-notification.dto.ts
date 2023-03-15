import { IsOptional } from 'class-validator';

export class CreateNotificationDto {


  @IsOptional()
  recipient_id: number;

  @IsOptional()
  sender_id: number;

  @IsOptional()
  content: string;
}
