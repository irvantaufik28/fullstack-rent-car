import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserDetailRepository } from './repository/user-detail.repository';
import { UserRepository } from './repository/user.repository';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDetailRepository: UserDetailRepository,
    private readonly mailService: MailService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
  
      const user = await this.userRepository.createUser(createUserDto);
      createUserDto.user_id = user.id;
      await this.userDetailRepository.createDetailUser(createUserDto);

      // await this.mailService.sendMail()
      
      return user;

  }

  async getUserById(id: number): Promise<UserEntity> {
    const inculde: object = {
      user_detail: true,
    };

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
