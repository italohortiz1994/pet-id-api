import 'reflect-metadata';

import { DataSource, DataSourceOptions } from 'typeorm';

import { PetIdentity } from '../pet-identity/entities/pet-identity.entity';
import { Pet } from '../pets/entities/pet.entity';
import { PetNews } from '../pet-news/entities/pet-news.entity';
import { HealthRecord } from '../health-records/entities/health-record.entity';
import { Vaccine } from '../health-records/entities/vaccine.entity';
import { InitDatabase1745193600000 } from './migrations/1745193600000-InitDatabase';
import { AddHealthRecords1745276400000 } from './migrations/1745276400000-AddHealthRecords';
import { AddVaccines1745278200000 } from './migrations/1745278200000-AddVaccines';
import { AddUsers1760000000000 } from './migrations/1760000000000-AddUsers';
import { AddVets1777075200000 } from './migrations/1777075200000-AddVets';
import { AddVetProfileFields1777075300000 } from './migrations/1777075300000-AddVetProfileFields';
import { AddPetNews1777075400000 } from './migrations/1777075400000-AddPetNews';
import { User } from '../users/entities/user.entity';
import { Vet } from '../vets/entities/vet.entity';

const databasePort = Number(process.env.DB_PORT ?? 5432);
const databaseUrl = process.env.DATABASE_URL;
const useSsl =
  (process.env.DB_SSL ?? (databaseUrl ? 'true' : 'false')).toLowerCase() ===
  'true';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  ...(databaseUrl
    ? {
        url: databaseUrl,
      }
    : {
        host: process.env.DB_HOST ?? 'localhost',
        port: databasePort,
        username: process.env.DB_USERNAME ?? 'postgres',
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_DATABASE ?? 'petid',
      }),
  entities: [Pet, PetIdentity, HealthRecord, Vaccine, User, Vet, PetNews],
  migrations: [
    InitDatabase1745193600000,
    AddHealthRecords1745276400000,
    AddVaccines1745278200000,
    AddUsers1760000000000,
    AddVets1777075200000,
    AddVetProfileFields1777075300000,
    AddPetNews1777075400000,
  ],
  ssl: useSsl ? { rejectUnauthorized: false } : false,
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);
