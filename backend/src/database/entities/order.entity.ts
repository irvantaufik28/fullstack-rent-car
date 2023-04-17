import { CarEntity } from './car.entity'; 
import { UserEntity } from './user.entity'; 
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order')
export class OrderEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  total_price: number;

  @Column()
  start_rent_at: Date;

  @Column()
  finish_rent_at: Date;

  @Column()
  status: string;

  @Column()
  slip_id: number;

  @Column()
  user_id: number;

  @Column()
  car_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => UserEntity, (o) => o.order)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CarEntity, (o) => o.order)
  @JoinColumn({ name: "car_id" })
  car: CarEntity;
}
