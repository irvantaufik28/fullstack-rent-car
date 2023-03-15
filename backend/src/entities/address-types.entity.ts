import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerAddressEntity } from "./customer-address.entity";

@Entity('address_types')
export class AddressTypesEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    code: string;

    @Column()
    name: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;

    @OneToMany(() => CustomerAddressEntity, (o) => o.id)
    customer_address: CustomerAddressEntity[];
}