import 'dotenv/config';

import { DataSource, DataSourceOptions } from 'typeorm';

import * as migrations from './migrations';
import * as entities from './entities';

const typeormConfig: DataSourceOptions = {
  database: process.env.DB_NAME,
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
  schema: 'public',
  migrationsRun: false,
  migrations,
  entities,
  logging: true,
};

export const dataSource = new DataSource(typeormConfig);
