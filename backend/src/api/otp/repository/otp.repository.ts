import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from 'src/database/entities/otp.entity';
import { Repository } from 'typeorm';
import { CreateOtpDto } from '../dto/create-otp.dto';

export class OtpRepository extends Repository<OtpEntity> {
  constructor(
    @InjectRepository(OtpEntity)
    private otpRepository: Repository<OtpEntity>,
  ) {
    super(
      otpRepository.target,
      otpRepository.manager,
      otpRepository.queryRunner,
    );
  }

  async generateOtp(createOtpDto: CreateOtpDto): Promise<any> {
    const otp = createOtpDto;
    (otp.email = createOtpDto.email),
      (otp.otp_code = this.generateRandomNumber(6));
    (otp.otp_type = createOtpDto.otp_type),
      (otp.expired_at = new Date(Date.now() + 2 * 60000));

    return await this.otpRepository.save(otp);
  }

  private generateRandomNumber(len: number) {
    let randStr = '';
    for (let i = 0; i < len; i++) {
      randStr += Math.floor(Math.random() * 10);
    }
    return randStr;
  }

  async getOtpByEmail(email: string): Promise<OtpEntity> {
    const currentDate = new Date();
    const queryBuilder = this.otpRepository.createQueryBuilder('otp');

    const otp = await queryBuilder
      .where('otp.email = :email', { email })
      .andWhere('otp.expired_at >= :currentDate', { currentDate })
      .getOne();

    return otp;
  }
}
