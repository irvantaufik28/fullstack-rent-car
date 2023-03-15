import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
dotenv.config();


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
      host:
        process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      entities: ['dist/**/*.entity.{ts,js}'], // linux config entities
      // entities: [UserEntity, UserDetailEntity, CarEntity, OrderEntity], //  window config entities
      migrations: ['dist/shared/typeorm/migrations/*.js'],
      logging: true,
      synchronize: true
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource;