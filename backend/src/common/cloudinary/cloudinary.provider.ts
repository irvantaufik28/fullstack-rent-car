import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
import * as dotenv from 'dotenv';
dotenv.config();

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
}