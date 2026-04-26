import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePetNewsDto } from './dto/create-pet-news.dto';
import { PetNewsQueryDto } from './dto/pet-news-query.dto';
import { UpdatePetNewsDto } from './dto/update-pet-news.dto';
import { PetNewsService } from './pet-news.service';

@Controller('pet-news')
export class PetNewsController {
  constructor(private readonly service: PetNewsService) {}

  @Post()
  create(@Body() dto: CreatePetNewsDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query() query: PetNewsQueryDto) {
    return this.service.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Post(':id/like')
  like(@Param('id') id: string) {
    return this.service.like(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePetNewsDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
