import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService){}

    @Get()
    sendMail(): void{
        // return this.mailService.sendMail()
    }
}
