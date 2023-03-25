import { Factory, Seeder } from "typeorm-seeding";
import { Connection, getConnection } from "typeorm";

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const defaultConnection = getConnection();
    // ...
  }
}
