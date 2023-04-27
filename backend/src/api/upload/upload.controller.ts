import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { readFileSync } from 'fs';

@Controller('upload')
export class UploadController {
  constructor() {}

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
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    const fileBuffers = await Promise.all(
      files.map((file) => readFileSync(file.path)),
    );

    // Lakukan pengolahan file buffer di sini
    console.log(fileBuffers);
    return 'success';
  }
}
