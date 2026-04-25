import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetNews } from './entities/pet-news.entity';
import { PetNewsController } from './pet-news.controller';
import { PetNewsService } from './pet-news.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetNews])],
  controllers: [PetNewsController],
  providers: [PetNewsService],
})
export class PetNewsModule {}
