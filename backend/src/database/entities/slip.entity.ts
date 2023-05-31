import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';


@Entity('slip')
export class SlipEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @Column()
  order_id: number;

  @Column()
  url_slip: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @OneToOne(() => OrderEntity, (o) => o.slip )
  @JoinColumn({ name: "order_id"})
  slip: SlipEntity
 
}
