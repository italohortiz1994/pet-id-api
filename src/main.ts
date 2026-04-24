import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  //app.useStaticAssets(join(process.cwd(), 'frontend'));

  await app.listen(process.env.PORT || 3000, '0.0.0.0');

  process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT:', err);
  });

  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED:', err);
  });
}
bootstrap();
