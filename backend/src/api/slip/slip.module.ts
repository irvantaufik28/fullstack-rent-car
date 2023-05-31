import { Module } from '@nestjs/common';
import { SlipController } from './slip.controller';
import { SlipService } from './slip.service';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';
import { CloudinaryProvider } from 'src/common/cloudinary/cloudinary.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlipEntity } from 'src/database/entities/slip.entity';

@Module({
  imports : [TypeOrmModule.forFeature([SlipEntity])],
  controllers: [SlipController],
  providers: [SlipService, CloudinaryService, CloudinaryProvider]
})
export class SlipModule {}
