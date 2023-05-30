import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";
dotenv.config();


export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
      host:"containers-us-west-210.railway.app",
      port: 7229,
      database: "railway",
      username: "postgres",
      password: "oh74QDXPO0xUwLdvUAxF",
      entities: ['dist/**/*.entity.{ts,js}'], // linux config entities
      // entities: [UserEntity, UserDetailEntity, CarEntity, OrderEntity], //  window config entities
      migrations: ['dist/shared/typeorm/migrations/*.js'],
      logging: true,
      synchronize: true
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource;