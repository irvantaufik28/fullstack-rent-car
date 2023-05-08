import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CarMediaService } from './car_media.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SecurityType } from 'src/common/enum/enum';
import { Roles } from 'src/common/decorator/roles.decorator';
import { UploadImageDto } from './dto/upload-image.dto';
import { CarMediaEntity } from 'src/database/entities/car-media.entity';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { RolesGuard } from 'src/common/guard/jwt-role.guard';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('car-media')
export class CarMediaController {
  constructor(private readonly carMediaService: CarMediaService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 5, {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}-${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  @Roles(SecurityType.STAF)
  @UseGuards(JwGuard, RolesGuard)
  async uploadCarImage(
    @Body() payload: UploadImageDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<CarMediaEntity> {

    return await this.carMediaService.uploadCarImage(payload, files);
  }
}
