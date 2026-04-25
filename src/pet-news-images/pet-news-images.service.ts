import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetNewsService } from '../pet-news/pet-news.service';
import { CreatePetNewsImageDto } from './dto/create-pet-news-image.dto';
import { PetNewsImage } from './entities/pet-news-image.entity';

@Injectable()
export class PetNewsImagesService {
  constructor(
    @InjectRepository(PetNewsImage)
    private readonly repo: Repository<PetNewsImage>,
    private readonly petNewsService: PetNewsService,
  ) {}

  async create(newsId: number, dto: CreatePetNewsImageDto) {
    await this.petNewsService.findOne(newsId);

    const image = this.repo.create({
      newsId,
      imageUrl: dto.imageUrl,
      caption: dto.caption ?? null,
      sortOrder: dto.sortOrder ?? 0,
    });

    return this.repo.save(image);
  }

  findByNews(newsId: number) {
    return this.repo.find({
      where: { newsId },
      order: { sortOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async remove(id: number) {
    const image = await this.repo.findOne({ where: { id } });

    if (!image) {
      throw new NotFoundException('Imagem nao encontrada');
    }

    await this.repo.remove(image);
    return { message: 'Imagem removida com sucesso' };
  }
}
