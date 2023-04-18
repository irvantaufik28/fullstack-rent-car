import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

 async sendMail(subject: any, recipient: any, text: any, html: any): Promise<void> {
  await  this.mailerService.sendMail({
      to: recipient,
      from: `"${process.env.MAILER_SENDER_NAME}" <${process.env.MAILER_SENDER_EMAIL}>`,
      subject: subject,
      text: text,
      html: html,
    });
  }

}
