import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetComment } from '../pet-comments/entities/pet-comment.entity';
import { PetNewsImage } from '../pet-news-images/entities/pet-news-image.entity';
import { PetNews } from './entities/pet-news.entity';
import { PetNewsController } from './pet-news.controller';
import { PetNewsService } from './pet-news.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetNews, PetNewsImage, PetComment])],
  controllers: [PetNewsController],
  providers: [PetNewsService],
  exports: [PetNewsService],
})
export class PetNewsModule {}
