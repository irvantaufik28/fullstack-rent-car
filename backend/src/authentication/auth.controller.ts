import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwGuard } from 'src/common/guard/jwt.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshAccessTokenDto } from './dto/refresh-access-token.dto';
import { loginResponse } from './interface/login.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<loginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  async refreshToken(@Body() refresTokenDto : RefreshAccessTokenDto): Promise <{access_token: string}> {
    return this.authService.refreshAccessToken(refresTokenDto)
  }


  @Patch('/:id/revoke')
  @UseGuards(JwGuard)
  async revokeRefreshToken(@Param('id') id: number):Promise<void> {
    return await this.authService.revokeRefreshToken(id)
  }
}
