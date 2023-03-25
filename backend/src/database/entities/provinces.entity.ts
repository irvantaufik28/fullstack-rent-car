import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CitiesEntity } from './cities.entity';
import { CountriesEntity } from './countries.entity';

@Entity('provinces')
export class ProvincesEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  country_id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(()=> CountriesEntity, (o) => o.provinces)
  @JoinColumn({name: 'country_id'})
  country: CountriesEntity;

  @OneToMany(() => CitiesEntity, (o) => o.id)
  cities: CitiesEntity[];
}
