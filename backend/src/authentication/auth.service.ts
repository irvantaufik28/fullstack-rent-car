import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../api/user/repository/user.repository';
import { LoginDto } from './dto/login.dto';
import { loginResponse } from './interface/login.interface';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly userRepository: UserRepository,
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
    return { access_token }as loginResponse
  }

  async createAccessToken(user: UserEntity): Promise<string> {
    const payload = {
      id: user.id,
      role_name: user.role_name,
    };
    const access_token = await this.JwtService.signAsync(payload);
    return access_token
  }


}
