import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetNewsModule } from '../pet-news/pet-news.module';
import { PetComment } from './entities/pet-comment.entity';
import { PetCommentsController } from './pet-comments.controller';
import { PetCommentsService } from './pet-comments.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetComment]), PetNewsModule],
  controllers: [PetCommentsController],
  providers: [PetCommentsService],
})
export class PetCommentsModule {}
