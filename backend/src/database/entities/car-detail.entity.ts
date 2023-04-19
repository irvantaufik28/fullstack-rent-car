import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarEntity } from "./car.entity";

@Entity('car_detail')
export class CarDetailEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    car_id:number

    @Column()
    owner_id: number

    @Column()
    vehicle_color: string
    
    @Column()
    car_brand: string

    @Column()
    plat_number: string

    @Column()
    transmission: string

    @Column()
    fuel_type: string

    @Column()
    description: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @OneToOne(() => CarEntity, (o) => o.car_detail)
    @JoinColumn({name: 'car_id'})
    car_detail: CarEntity
  
}