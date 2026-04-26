import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetComment } from '../pet-comments/entities/pet-comment.entity';
import { PetNewsImage } from '../pet-news-images/entities/pet-news-image.entity';
import { Pet } from '../pets/entities/pet.entity';
import { PetNews } from './entities/pet-news.entity';
import { PetNewsLike } from './entities/pet-news-like.entity';
import { PetNewsController } from './pet-news.controller';
import { PetNewsService } from './pet-news.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PetNews,
      PetNewsImage,
      PetComment,
      Pet,
      PetNewsLike,
    ]),
  ],
  controllers: [PetNewsController],
  providers: [PetNewsService],
  exports: [PetNewsService],
})
export class PetNewsModule {}
