import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './database/data-source';
import { PetIdentityModule } from './pet-identity/pet-identity.module';
import { PetsModule } from './pets/pets.module';
import { UsersModule } from './users/users.module';
import { HealthRecordsModule } from './health-records/health-records.module';
import { PetCommentsModule } from './pet-comments/pet-comments.module';
import { PetFriendsModule } from './pet-friends/pet-friends.module';
import { PetNewsModule } from './pet-news/pet-news.module';
import { PetNewsImagesModule } from './pet-news-images/pet-news-images.module';
import { VetsModule } from './vets/vets.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PetsModule,
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
      synchronize: false,
    }),
    PetIdentityModule,
    HealthRecordsModule,
    VetsModule,
    PetNewsModule,
    PetCommentsModule,
    PetFriendsModule,
    PetNewsImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
