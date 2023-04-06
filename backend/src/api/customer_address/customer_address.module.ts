import { Module } from '@nestjs/common';
import { CustomerAddressService } from './customer_address.service';
import { CustomerAddressController } from './customer_address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddressEntity } from 'src/database/entities/customer-address.entity';
import { CustomerAddressRepository } from './repository/customer_address.repository';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserRepository } from '../user/repository/user.repository';
import { UserService } from '../user/user.service';
import { UserDetailRepository } from '../user/repository/user-detail.repository';
import { UserDetailEntity } from 'src/database/entities/user-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerAddressEntity,
      UserEntity,
      UserDetailEntity,
    ]),
  ],
  providers: [
    CustomerAddressService,
    CustomerAddressRepository,
    UserRepository,
    UserService,
    UserDetailRepository,
  ],
  controllers: [CustomerAddressController],
})
export class CustomerAddressModule {}
