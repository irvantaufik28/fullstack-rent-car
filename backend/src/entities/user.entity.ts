import { SecurityType } from "src/common/enum/enum"; 
import { Exclude } from "class-transformer";
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDetailEntity } from './user-detail.entity';
import { OrderEntity } from "src/entities/order.entity"; 
import { CustomerAddressEntity } from "./customer-address.entity";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({
    nullable: false,
    enum: SecurityType,
    type: String,
    default: SecurityType.CUSTOMER,
  })
  role_name: SecurityType.CUSTOMER;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_at: Date;

  @OneToOne(() => UserDetailEntity, (userDetail) => userDetail.user_detail)
  user_detail: UserDetailEntity;

  @OneToMany(()=> OrderEntity, (o) => o.id)
  order: OrderEntity[]

  @OneToMany(() => CustomerAddressEntity, (o) => o.id) 
  customer_address: CustomerAddressEntity[];
}
