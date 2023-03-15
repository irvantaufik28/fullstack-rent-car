import { OrderEntity } from 'src/api/order/entity/order.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity('car')
export class CarEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name:string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column({ type: 'boolean', default: false })
  status: boolean;

  @Column({nullable: true})
  start_rent_at: Date;

  @Column({nullable: true})
  finish_rent_at: Date;

  @Column({nullable: true})
  image: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToMany (()=> OrderEntity, (o) => o.id)
  order: OrderEntity[]
}
