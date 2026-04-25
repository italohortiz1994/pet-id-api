import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePetNewsImageDto } from './dto/create-pet-news-image.dto';
import { PetNewsImagesService } from './pet-news-images.service';

@Controller('pet-news')
export class PetNewsImagesController {
  constructor(private readonly service: PetNewsImagesService) {}

  @Post(':newsId/images')
  create(@Param('newsId') newsId: string, @Body() dto: CreatePetNewsImageDto) {
    return this.service.create(Number(newsId), dto);
  }

  @Get(':newsId/images')
  findByNews(@Param('newsId') newsId: string) {
    return this.service.findByNews(Number(newsId));
  }

  @Delete('images/:id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
