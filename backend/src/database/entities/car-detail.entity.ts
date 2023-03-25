import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CarDetail extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    car_id:number

    @Column()
    vehicle_color: string

  
    

}