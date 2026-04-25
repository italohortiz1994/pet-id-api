import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetNewsModule } from '../pet-news/pet-news.module';
import { PetNewsImage } from './entities/pet-news-image.entity';
import { PetNewsImagesController } from './pet-news-images.controller';
import { PetNewsImagesService } from './pet-news-images.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetNewsImage]), PetNewsModule],
  controllers: [PetNewsImagesController],
  providers: [PetNewsImagesService],
})
export class PetNewsImagesModule {}
