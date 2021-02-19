import { Connection, createConnection } from 'typeorm';
import path from 'path';

export default class Database {
  readonly entitiesDir = path.join(__dirname, '/entities/*.js');

  readonly migrationsDir = path.join(__dirname, '/migrations/*.js');

  async connect(): Promise<Connection> {
    return createConnection({
      type: 'postgres',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: process.env.NODE_ENV !== 'production',
      entities: [this.entitiesDir],
      migrations: [this.migrationsDir],
      cli: {
        entitiesDir: this.entitiesDir,
        migrationsDir: this.migrationsDir,
      },
    });
  }
}
