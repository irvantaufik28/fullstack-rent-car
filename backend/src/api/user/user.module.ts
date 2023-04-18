import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailEntity } from 'src/database/entities/user-detail.entity';
import { UserEntity } from 'src/database/entities/user.entity'; 
import { UserDetailRepository } from './repository/user-detail.repository';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MailService } from '../mail/mail.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,UserDetailEntity])],
  providers: [UserService, UserRepository, UserDetailRepository, MailService],
  controllers: [UserController],
  exports: [UserService, UserRepository, UserDetailRepository]
})
export class UserModule {}
