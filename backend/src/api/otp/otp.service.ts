import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OtpRepository } from './repository/otp.repository';
import { CreateOtpDto } from './dto/create-otp.dto';
import { MailService } from '../mail/mail.service';
import { OtpEntity } from 'src/database/entities/otp.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailType } from 'src/common/internal/const/emailType';

@Injectable()
export class OtpService {
  constructor(
    private readonly otpCustomeRepository: OtpRepository,
    private readonly mailService: MailService,
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
  ) { }

  async generateOtp(payload: CreateOtpDto): Promise<any> {
    let otp = await this.otpCustomeRepository.getOtpByEmail(payload.email)
    if (otp !== null) {
      throw new HttpException(
        'wait until: ' + otp.expired_at,
        HttpStatus.BAD_REQUEST,
      );
    }

    let content = EmailType[payload.otp_type.toUpperCase()];
    if (typeof content === undefined) {
      return;
    }

    otp = await this.otpCustomeRepository.generateOtp(payload);
    let text = content.text_value.replace('{otp}', otp.otp_code);
    let html = content.html_value.replace('{otp}', otp.otp_code);

    await this.mailService.sendMail('OTP_CODE', payload.email, text, html);
    return {
      message: 'check your email',
    };
  }

  async verifyOtp(email: string, otp_code: string, otp_type: string): Promise<OtpEntity> {
    const otp = await this.otpRepository.findOne({
      where: {
        otp_code,
        otp_type,
        email
      }
    })

    if (!otp) {
      throw new HttpException('invalid otp code', HttpStatus.NOT_FOUND)
    }
    return otp
  }

  async deleteOtp(email: string): Promise<void> {
    await this.otpRepository.delete(email);
  }
}
