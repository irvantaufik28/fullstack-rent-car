import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

export const jwtConfig: JwtModuleOptions = {
  secret: "120wosdoowe0112nn0p9wd12n1212enpj",
  signOptions: {
    expiresIn: 86400000,
  },
};

export const refreshTokenConfig: JwtSignOptions = {
  
    expiresIn: 86400000,
  }
