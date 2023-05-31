import { Module } from '@nestjs/common';
import { SlipController } from './slip.controller';
import { SlipService } from './slip.service';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { CloudinaryProvider } from 'src/common/cloudinary/cloudinary.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlipEntity } from 'src/database/entities/slip.entity';
import { OrderRepository } from '../order/repository/order.repository';
import { OrderEntity } from 'src/database/entities/order.entity';

@Module({
  imports : [TypeOrmModule.forFeature([SlipEntity, OrderEntity])],
  controllers: [SlipController],
  providers: [SlipService, CloudinaryService, CloudinaryProvider, OrderRepository]
})
export class SlipModule {}
