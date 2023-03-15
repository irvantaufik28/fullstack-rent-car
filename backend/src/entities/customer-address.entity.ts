import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AddressTypesEntity } from './address-types.entity';
import { CitiesEntity } from './cities.entity';
import { UserDetailEntity } from './user-detail.entity';
import { UserEntity } from './user.entity';

@Entity('customer_address')
export class CustomerAddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_detail_id: number;

  @Column()
  city_id: number;

  @Column()
  address_type_id: number;

  @Column()
  is_main_address: boolean;

  @Column()
  detail_address: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_at: Date;

  @ManyToOne(() => AddressTypesEntity, (o) => o.customer_address)
  @JoinColumn({name: 'address_type_id'})
  address_type: AddressTypesEntity;

  @ManyToOne(() => UserDetailEntity, (o) => o.customer_address)
  @JoinColumn({name: 'user_detail_id'})
  user_detail : UserDetailEntity

  @ManyToOne(() => CitiesEntity, (o) =>o.customer_address)
  @JoinColumn({ name: 'city_id'})
  cities: CitiesEntity;

 }
