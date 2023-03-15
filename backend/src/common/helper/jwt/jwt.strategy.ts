import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from 'src/api/user/repository/user.repository';
import { jwtConfig } from 'src/common/config/jwt.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      igonereExpiration: true,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findById(payload.id);
    if (!user) {
        throw new UnauthorizedException('user not found');
        
    }
    
    return {
      id: user.id,
      email: user.email,
      role_name: user.role_name,
    };
  }
}
