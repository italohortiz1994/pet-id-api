import { AppDataSource } from './data-source';

async function migrate(): Promise<void> {
  await AppDataSource.initialize();

  try {
    await AppDataSource.runMigrations();
  } finally {
    await AppDataSource.destroy();
  }
}

void migrate();
