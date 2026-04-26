import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetComment } from '../pet-comments/entities/pet-comment.entity';
import { PetNewsImage } from '../pet-news-images/entities/pet-news-image.entity';
import { CreatePetNewsDto } from './dto/create-pet-news.dto';
import { PetNewsQueryDto } from './dto/pet-news-query.dto';
import { UpdatePetNewsDto } from './dto/update-pet-news.dto';
import { PetNews } from './entities/pet-news.entity';

@Injectable()
export class PetNewsService {
  constructor(
    @InjectRepository(PetNews)
    private readonly repo: Repository<PetNews>,
    @InjectRepository(PetNewsImage)
    private readonly imageRepo: Repository<PetNewsImage>,
    @InjectRepository(PetComment)
    private readonly commentRepo: Repository<PetComment>,
  ) {}

  private async toResponse(news: PetNews) {
    const comments = await this.commentRepo.count({
      where: { newsId: news.id },
    });
    const images =
      news.images ??
      (await this.imageRepo.find({
        where: { newsId: news.id },
        order: { sortOrder: 'ASC', createdAt: 'ASC' },
      }));

    return {
      ...news,
      imageUrl: news.imageUrl ?? images[0]?.imageUrl ?? '',
      images,
      comments,
      commentsCount: comments,
      likes: 0,
      likesCount: 0,
      petName: news.pet?.name ?? '',
      petBreed: news.pet?.breed ?? '',
    };
  }

  async create(dto: CreatePetNewsDto) {
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

    const savedNews = await this.repo.save(news);
    const imageUrls = [
      ...(dto.imageUrl ? [dto.imageUrl] : []),
      ...(dto.imageUrls ?? []),
    ];

    if (imageUrls.length > 0) {
      await this.imageRepo.save(
        imageUrls.map((imageUrl, index) =>
          this.imageRepo.create({
            newsId: savedNews.id,
            imageUrl,
            sortOrder: index,
          }),
        ),
      );
    }

    return this.findOne(savedNews.id);
  }

  async findAll(query: PetNewsQueryDto) {
    const page = Math.max(Number(query.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(query.limit ?? 20), 1), 100);
    const builder = this.repo
      .createQueryBuilder('news')
      .orderBy('news.publishedAt', 'DESC', 'NULLS LAST')
      .addOrderBy('news.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (query.petId) {
      builder.andWhere('news.petId = :petId', { petId: query.petId });
    }

    if (query.category) {
      builder.andWhere('news.category = :category', {
        category: query.category,
      });
    }

    if (query.published !== undefined) {
      builder.andWhere('news.isPublished = :isPublished', {
        isPublished: query.published === true || query.published === 'true',
      });
    }

    if (query.q) {
      builder.andWhere(
        '(news.title ILIKE :q OR news.content ILIKE :q OR news.category ILIKE :q)',
        { q: `%${query.q}%` },
      );
    }

    const pageItems = await builder.getMany();
    const ids = pageItems.map((item) => item.id);

    if (ids.length === 0) {
      return [];
    }

    const news = await this.repo
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.pet', 'pet')
      .leftJoinAndSelect('news.images', 'images')
      .where('news.id IN (:...ids)', { ids })
      .orderBy('news.publishedAt', 'DESC', 'NULLS LAST')
      .addOrderBy('news.createdAt', 'DESC')
      .addOrderBy('images.sortOrder', 'ASC')
      .addOrderBy('images.createdAt', 'ASC')
      .getMany();

    return Promise.all(news.map((item) => this.toResponse(item)));
  }

  async findOne(id: number) {
    const news = await this.repo.findOne({
      where: { id },
      relations: {
        pet: true,
        images: true,
      },
      order: {
        images: {
          sortOrder: 'ASC',
          createdAt: 'ASC',
        },
      },
    });

    if (!news) {
      throw new NotFoundException('Noticia nao encontrada');
    }

    return this.toResponse(news);
  }

  async update(id: number, dto: UpdatePetNewsDto) {
    const news = await this.repo.findOne({ where: { id } });

    if (!news) {
      throw new NotFoundException('Noticia nao encontrada');
    }

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

    await this.repo.save(news);

    if (dto.imageUrls) {
      await this.imageRepo.delete({ newsId: id });
      await this.imageRepo.save(
        dto.imageUrls.map((imageUrl, index) =>
          this.imageRepo.create({
            newsId: id,
            imageUrl,
            sortOrder: index,
          }),
        ),
      );
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const news = await this.repo.findOne({ where: { id } });

    if (!news) {
      throw new NotFoundException('Noticia nao encontrada');
    }

    await this.repo.remove(news);

    return { message: 'Noticia removida com sucesso' };
  }
}
