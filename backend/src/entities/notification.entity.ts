import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifcation')
export class NotificationsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  recipient_id: number;

  @Column()
  sender_id: number;

  @Column()
  content: string;
}
