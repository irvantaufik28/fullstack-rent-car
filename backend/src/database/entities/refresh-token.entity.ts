import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('refresh_token')
export class RefreshTokenEntity extends BaseEntity{
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    isRevoked: boolean;

    @Column()
    expiredAt: Date

    @Column()
    token_id: number

    @ManyToOne(() => UserEntity, (o) => o.refreshTokens)
    @JoinColumn({name : 'token_id'})
    user: UserEntity
}