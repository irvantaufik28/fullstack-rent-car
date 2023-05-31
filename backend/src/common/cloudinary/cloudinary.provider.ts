import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';
import * as dotenv from 'dotenv';
dotenv.config();

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: (): any => {
    return v2.config({
      cloud_name: "dnvltueqb",
      api_key: "131712519741951",
      api_secret: "hj0ZgOKOwG8l5o8vpnSwPtR6US0",
    });
  },
}