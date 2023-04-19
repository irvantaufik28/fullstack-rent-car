import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CarEntity } from "./car.entity";

@Entity('car_media')
export class CarMediaEntity extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    car_id: number

    @Column()
    is_main_image : boolean

    @Column()
    image_url: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @ManyToOne(() => CarEntity, (o) => o.car_media)
    @JoinColumn({name: "car_id"})
    car: CarEntity

}
