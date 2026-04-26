import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetComment } from '../pet-comments/entities/pet-comment.entity';
import { PetNewsImage } from '../pet-news-images/entities/pet-news-image.entity';
import { Pet } from '../pets/entities/pet.entity';
import { CreatePetNewsDto } from './dto/create-pet-news.dto';
import { PetNewsQueryDto } from './dto/pet-news-query.dto';
import { UpdatePetNewsDto } from './dto/update-pet-news.dto';
import { PetNews } from './entities/pet-news.entity';
import { PetNewsLike } from './entities/pet-news-like.entity';

@Injectable()
export class PetNewsService {
  constructor(
    @InjectRepository(PetNews)
    private readonly repo: Repository<PetNews>,
    @InjectRepository(PetNewsImage)
    private readonly imageRepo: Repository<PetNewsImage>,
    @InjectRepository(PetComment)
    private readonly commentRepo: Repository<PetComment>,
    @InjectRepository(Pet)
    private readonly petRepo: Repository<Pet>,
    @InjectRepository(PetNewsLike)
    private readonly likeRepo: Repository<PetNewsLike>,
  ) {}

  private getUserIdFromAuthorization(authorization: string) {
    const [, token = ''] = authorization.split(' ');
    const [, payload = ''] = token.split('.');

    if (!payload) {
      return '';
    }

    try {
      const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
      const padded = `${normalized}${'='.repeat(
        (4 - (normalized.length % 4)) % 4,
      )}`;
      const decoded = JSON.parse(
        Buffer.from(padded, 'base64').toString('utf8'),
      ) as Record<string, unknown>;

      return typeof decoded.sub === 'string' ? decoded.sub : '';
    } catch {
      return '';
    }
  }

  private async findPetSummary(petId: string | null) {
    if (!petId) {
      return null;
    }

    return this.petRepo
      .createQueryBuilder('pet')
      .where('pet.id::text = :petId', { petId: String(petId) })
      .getOne();
  }

  private async toResponse(news: PetNews) {
    const comments = await this.commentRepo.count({
      where: { newsId: news.id },
    });
    const pet = await this.findPetSummary(news.petId);
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
      likes: news.likesCount ?? 0,
      likesCount: news.likesCount ?? 0,
      petName: pet?.name ?? '',
      petBreed: pet?.breed ?? '',
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
      likesCount: 0,
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

  async like(id: number, userId: string, authorization = '') {
    const resolvedUserId = this.getUserIdFromAuthorization(authorization) || userId;

    if (!resolvedUserId) {
      throw new BadRequestException('Usuario obrigatorio para curtir.');
    }

    const news = await this.repo.findOne({ where: { id } });

    if (!news) {
      throw new NotFoundException('Noticia nao encontrada');
    }

    const existingLike = await this.likeRepo.findOne({
      where: { newsId: id, userId: resolvedUserId },
    });

    if (existingLike) {
      return this.findOne(id);
    }

    try {
      await this.likeRepo.save(
        this.likeRepo.create({
          newsId: id,
          userId: resolvedUserId,
        }),
      );
    } catch {
      return this.findOne(id);
    }

    news.likesCount = (news.likesCount ?? 0) + 1;
    await this.repo.save(news);

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
