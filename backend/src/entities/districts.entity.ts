import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CitiesEntity } from "./cities.entity";

@Entity('districts')
export class DistrictsEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    city_id: number;

    @Column()
    name: string;

    @Column()
    postal_code: string;


    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    update_at: Date;

    @ManyToOne(() => CitiesEntity, (o) => o.districts)
    @JoinColumn({name: 'city_id'})
    cities: CitiesEntity;
}