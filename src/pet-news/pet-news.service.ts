import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreatePetNewsDto } from './dto/create-pet-news.dto';
import { PetNewsQueryDto } from './dto/pet-news-query.dto';
import { UpdatePetNewsDto } from './dto/update-pet-news.dto';
import { PetNews } from './entities/pet-news.entity';

@Injectable()
export class PetNewsService {
  constructor(
    @InjectRepository(PetNews)
    private readonly repo: Repository<PetNews>,
  ) {}

  create(dto: CreatePetNewsDto) {
    const news = this.repo.create({
      petId: dto.petId ?? null,
      title: dto.title,
      summary: dto.summary ?? null,
      content: dto.content ?? null,
      imageUrl: dto.imageUrl ?? null,
      category: dto.category ?? null,
      sourceName: dto.sourceName ?? null,
      sourceUrl: dto.sourceUrl ?? null,
      isPublished: dto.isPublished ?? true,
      publishedAt: dto.publishedAt
        ? new Date(dto.publishedAt)
        : dto.isPublished === false
          ? null
          : new Date(),
    });

    return this.repo.save(news);
  }

  findAll(query: PetNewsQueryDto) {
    const where: FindOptionsWhere<PetNews> = {};

    if (query.petId) {
      where.petId = query.petId;
    }

    if (query.category) {
      where.category = query.category;
    }

    if (query.published !== undefined) {
      where.isPublished = query.published === 'true';
    }

    return this.repo.find({
      where,
      order: {
        publishedAt: 'DESC',
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const news = await this.repo.findOne({ where: { id } });

    if (!news) {
      throw new NotFoundException('Noticia nao encontrada');
    }

    return news;
  }

  async update(id: number, dto: UpdatePetNewsDto) {
    const news = await this.findOne(id);

    Object.assign(news, {
      ...dto,
      petId: dto.petId === undefined ? news.petId : dto.petId,
      summary: dto.summary === undefined ? news.summary : dto.summary,
      content: dto.content === undefined ? news.content : dto.content,
      imageUrl: dto.imageUrl === undefined ? news.imageUrl : dto.imageUrl,
      category: dto.category === undefined ? news.category : dto.category,
      sourceName:
        dto.sourceName === undefined ? news.sourceName : dto.sourceName,
      sourceUrl: dto.sourceUrl === undefined ? news.sourceUrl : dto.sourceUrl,
      publishedAt:
        dto.publishedAt === undefined
          ? news.publishedAt
          : new Date(dto.publishedAt),
    });

    return this.repo.save(news);
  }

  async remove(id: number) {
    const news = await this.findOne(id);
    await this.repo.remove(news);

    return { message: 'Noticia removida com sucesso' };
  }
}
