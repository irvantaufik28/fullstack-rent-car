import { Body, Controller, Post } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { OtpEntity } from 'src/database/entities/otp.entity';

@Controller('otp')
export class OtpController {
    constructor(private readonly otpService : OtpService){}

    @Post('generate')
    async generateOtp(@Body() payload: CreateOtpDto): Promise<OtpEntity> {
        return await this.otpService.generateOtp(payload)
    }
    
    @Post('verify')
    async verify(@Body() payload: CreateOtpDto): Promise<OtpEntity> {
        return await this.otpService.verifyOtp(payload.email, payload.otp_code, payload.otp_type)
    }
}
