import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarMediaService } from './car_media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { SecurityType } from 'src/common/enum/enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { UploadImageDto } from './dto/upload-image.dto';
import { CarMediaEntity } from 'src/database/entities/car-media.entity';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { RolesGuard } from 'src/common/guard/jwt-role.guard';

@Controller('car-media')
export class CarMediaController {
  constructor(private readonly carMediaService: CarMediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async uploadCarImage(
    @Body() payload: UploadImageDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CarMediaEntity> {
    return await this.carMediaService.uploadCarImage(payload, file);
  }
}
