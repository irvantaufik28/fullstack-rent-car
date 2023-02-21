import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: 'secret',
  signOptions: {
    expiresIn: 360,
  },
};
