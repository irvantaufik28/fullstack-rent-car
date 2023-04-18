import { Module } from '@nestjs/common';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { OtpRepository } from './repository/otp.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from 'src/database/entities/otp.entity';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([OtpEntity])],
  providers: [OtpService, OtpRepository, MailService],
  controllers: [OtpController],
})
export class OtpModule {}
