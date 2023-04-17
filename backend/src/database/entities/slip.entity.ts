import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity('slip')
export class SlipEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @Column()
  order_id: string;

  @Column()
  url_slip: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

 
}
