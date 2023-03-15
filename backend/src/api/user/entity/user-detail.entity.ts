import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_detail')
export class UserDetailEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: true })
  last_name: string;

  @Column({ nullable: false, unique: true })
  phone_number: string;

  @Column({ nullable: false })
  address: string;

  @OneToOne(()=> UserEntity, (user)=> user.user_detail)
  @JoinColumn({ name: 'user_id' })
  user_detail: UserDetailEntity
}
