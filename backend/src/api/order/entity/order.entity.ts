import { CarEntity } from 'src/api/car/entity/car.entity';
import { UserEntity } from 'src/api/user/entity/user.entity';
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
  status: Boolean;

  @Column()
  slip: string;

  @Column()
  UserId: number;

  @Column()
  CarId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => UserEntity, (o) => o.order)
  @JoinColumn({ name: 'UserId' })
  user: UserEntity;

  @ManyToOne(() => CarEntity, (o) => o.order)
  @JoinColumn({ name: "CarId" })
  car: CarEntity;
}
