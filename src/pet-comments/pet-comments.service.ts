import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PetNewsService } from '../pet-news/pet-news.service';
import { CreatePetCommentDto } from './dto/create-pet-comment.dto';
import { UpdatePetCommentDto } from './dto/update-pet-comment.dto';
import { PetComment } from './entities/pet-comment.entity';

@Injectable()
export class PetCommentsService {
  constructor(
    @InjectRepository(PetComment)
    private readonly repo: Repository<PetComment>,
    private readonly petNewsService: PetNewsService,
  ) {}

  async create(newsId: number, dto: CreatePetCommentDto) {
    await this.petNewsService.findOne(newsId);

    const comment = this.repo.create({
      newsId,
      petId: dto.petId ?? null,
      userId: dto.userId ?? null,
      content: dto.content,
    });

    return this.repo.save(comment);
  }

  findByNews(newsId: number) {
    return this.repo.find({
      where: { newsId },
      relations: { pet: true, user: true },
      order: { createdAt: 'ASC' },
    });
  }

  async update(id: number, dto: UpdatePetCommentDto) {
    const comment = await this.findOne(id);
    comment.content = dto.content;

    return this.repo.save(comment);
  }

  async remove(id: number) {
    const comment = await this.findOne(id);
    await this.repo.remove(comment);

    return { message: 'Comentario removido com sucesso' };
  }

  private async findOne(id: number) {
    const comment = await this.repo.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Comentario nao encontrado');
    }

    return comment;
  }
}
