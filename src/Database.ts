import { Connection, createConnection } from 'typeorm';
import path from 'path';

export default class Database {
  static entitiesDir = path.join(__dirname, '/entity/*.js');

  static migrationsDir = path.join(__dirname, '/migrations/*.js');

  static async connect(): Promise<Connection> {
    return createConnection({
      type: 'postgres',
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: process.env.NODE_ENV !== 'production',
      entities: [Database.entitiesDir],
      migrations: [Database.migrationsDir],
      cli: {
        entitiesDir: Database.entitiesDir,
        migrationsDir: Database.migrationsDir,
      },
    });
  }
}
