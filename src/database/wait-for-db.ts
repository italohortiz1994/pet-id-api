import { AppDataSource } from './data-source';

const retryDelayInMs = 3000;
const maxAttempts = 20;

async function waitForDatabase(): Promise<void> {
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      await AppDataSource.initialize();
      await AppDataSource.destroy();
      return;
    } catch {
      if (AppDataSource.isInitialized) {
        await AppDataSource.destroy().catch(() => undefined);
      }

      if (attempt === maxAttempts) {
        throw new Error('Database is not available after multiple attempts.');
      }

      await new Promise((resolve) => setTimeout(resolve, retryDelayInMs));
    }
  }
}

void waitForDatabase();
