import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig, refreshTokenConfig } from 'src/common/config/jwt.config';
import { UserRepository } from '../api/user/repository/user.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/common/helper/jwt/jwt.strategy';
import { UserEntity } from 'src/database/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { RefreshTokenEntity } from 'src/database/entities/refresh-token.entity';

@Module({
  imports: [
    JwtModule.register(jwtConfig), TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity])
  ],
  providers: [AuthService, UserRepository,
    RefreshTokenRepository,
     JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
