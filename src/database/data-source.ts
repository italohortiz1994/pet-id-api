import 'reflect-metadata';

import { DataSource, DataSourceOptions } from 'typeorm';

import { PetIdentity } from '../pet-identity/entities/pet-identity.entity';
import { Pet } from '../pets/entities/pet.entity';
import { HealthRecord } from '../health-records/entities/health-record.entity';
import { Vaccine } from '../health-records/entities/vaccine.entity';
import { InitDatabase1745193600000 } from './migrations/1745193600000-InitDatabase';
import { AddHealthRecords1745276400000 } from './migrations/1745276400000-AddHealthRecords';
import { AddVaccines1745278200000 } from './migrations/1745278200000-AddVaccines';

const databasePort = Number(process.env.DB_PORT ?? 5432);

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: databasePort,
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_DATABASE ?? 'petid',
  entities: [Pet, PetIdentity, HealthRecord, Vaccine],
  migrations: [
    InitDatabase1745193600000,
    AddHealthRecords1745276400000,
    AddVaccines1745278200000,
  ],
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);
