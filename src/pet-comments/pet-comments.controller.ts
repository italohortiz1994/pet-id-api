import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePetCommentDto } from './dto/create-pet-comment.dto';
import { UpdatePetCommentDto } from './dto/update-pet-comment.dto';
import { PetCommentsService } from './pet-comments.service';

@Controller('pet-news')
export class PetCommentsController {
  constructor(private readonly service: PetCommentsService) {}

  @Post(':newsId/comments')
  create(@Param('newsId') newsId: string, @Body() dto: CreatePetCommentDto) {
    return this.service.create(Number(newsId), dto);
  }

  @Get(':newsId/comments')
  findByNews(@Param('newsId') newsId: string) {
    return this.service.findByNews(Number(newsId));
  }

  @Patch('comments/:id')
  update(@Param('id') id: string, @Body() dto: UpdatePetCommentDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete('comments/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
