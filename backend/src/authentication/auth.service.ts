import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../api/user/repository/user.repository';
import { LoginDto } from './dto/login.dto';
import { loginResponse } from './interface/login.interface';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/database/entities/user.entity';
import { RefreshTokenRepository } from './repository/refresh-token.repository';
import { refreshTokenConfig } from 'src/common/config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException(
        'email or password not incorect',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new HttpException(
        'email or password not incorect',
        HttpStatus.FORBIDDEN,
      );
    }
    const access_token = await this.createAccessToken(user);
    const refresh_token = await this.createRefreshToken(user);
    return { access_token, refresh_token } as loginResponse;
  }

  async createAccessToken(user: UserEntity): Promise<string> {
    const payload = {
      id: user.id,
      role_name: user.role_name,
    };
    const access_token = await this.JwtService.signAsync(payload);
    return access_token;
  }

  async createRefreshToken(user: UserEntity): Promise<string> {
    const refToken = await this.refreshTokenRepository.createRefreshToken(
      user,
     +refreshTokenConfig.expiresIn
    );

    const payload = {
      id: refToken.id,
    };
    const refresh_token = await this.JwtService.signAsync(
      payload,
      refreshTokenConfig,
    );

    return refresh_token;
  }
}
