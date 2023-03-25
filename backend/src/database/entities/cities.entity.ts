import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerAddressEntity } from "./customer-address.entity";
import { DistrictsEntity } from "./districts.entity";
import { ProvincesEntity } from "./provinces.entity";

@Entity('cities')
export class CitiesEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    province_id : number;

    @Column()
    code: string;

    @Column()
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;

    @ManyToOne(() => ProvincesEntity, (o) => o.cities)
    @JoinColumn({name : 'province_id'})
    provinces : ProvincesEntity;

    @OneToMany(() => DistrictsEntity, (o) => o.id)
    districts : DistrictsEntity[];

    @OneToMany(() => CustomerAddressEntity, (o) => o.id)
    customer_address: CustomerAddressEntity[];
    
}