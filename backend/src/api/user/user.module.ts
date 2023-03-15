import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetailEntity } from './entity/user-detail.entity';
import { UserEntity } from './entity/user.entity';
import { UserDetailRepository } from './repository/user-detail.repository';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,UserDetailEntity])],
  providers: [UserService, UserRepository, UserDetailRepository],
  controllers: [UserController],
  exports: [UserService, UserRepository, UserDetailRepository]
})
export class UserModule {}
