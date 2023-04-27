import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import * as streamifier from 'streamifier'; // Import modul streamifier untuk mengubah ArrayBuffer menjadi stream

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: ArrayBuffer,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      // Mengubah ArrayBuffer menjadi stream
      const stream = streamifier.createReadStream(Buffer.from(file));

      // Upload stream ke Cloudinary
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      // Menyambungkan stream upload dengan stream dari ArrayBuffer
      stream.pipe(upload);
    });
  }
}
