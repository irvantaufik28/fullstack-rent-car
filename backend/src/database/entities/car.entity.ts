import { CarDetailEntity } from './car-detail.entity';
import { CarMediaEntity } from './car-media.entity';
import { OrderEntity } from './order.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('car')
export class CarEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToMany(() => OrderEntity, (o) => o.id, { onDelete: 'CASCADE' })
  order: OrderEntity[];

  @OneToMany(() => CarMediaEntity, (o) => o.car)
  car_media: CarMediaEntity[];

  @OneToOne(() => CarDetailEntity, (o) => o.car_detail)
  car_detail: CarDetailEntity;
}
