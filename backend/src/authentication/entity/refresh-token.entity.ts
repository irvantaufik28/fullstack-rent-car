import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RefreshToken extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    isRevoked: boolean;

    @Column()
    expriedAt: Date
}