import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOtpDto {
  @IsOptional()
  email: string;

  @IsOptional()
  otp_type: string;

  @IsOptional()
  otp_code: string;

  @IsOptional()
  expired_at: Date;
}
