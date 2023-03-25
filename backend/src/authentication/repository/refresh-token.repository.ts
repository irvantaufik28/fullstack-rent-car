import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from 'src/database/entities/refresh-token.entity';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(
    @InjectRepository(RefreshTokenEntity)
    private refreshTokenRepository: Repository<RefreshTokenEntity>,
  ) {
    super(
      refreshTokenRepository.target,
      refreshTokenRepository.manager,
      refreshTokenRepository.queryRunner,
    );
  }

  createRefreshToken = async (
    user: UserEntity,
    ttl: number,
  ): Promise<RefreshTokenEntity> => {
    const refreshToken = this.refreshTokenRepository.create();
    refreshToken.user = user;
    refreshToken.isRevoked = false;
    const expiredAt = new Date();
    expiredAt.setTime(expiredAt.getTime() + ttl);

    refreshToken.expiredAt = expiredAt;

    return await refreshToken.save();
  };
}
