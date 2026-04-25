import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';
import { Vet } from './entities/vet.entity';

@Injectable()
export class VetsService {
  constructor(
    @InjectRepository(Vet)
    private readonly repo: Repository<Vet>,
  ) {}

  async create(dto: CreateVetDto) {
    try {
      return await this.repo.save(dto);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async findOneOrFail(id: number) {
    const vet = await this.findOne(id);

    if (!vet) {
      throw new NotFoundException('Veterinario nao encontrado');
    }

    return vet;
  }

  async update(id: number, dto: UpdateVetDto) {
    const vet = await this.findOneOrFail(id);
    Object.assign(vet, dto);

    try {
      return await this.repo.save(vet);
    } catch (error) {
      this.handleDatabaseError(error);
    }
  }

  async remove(id: number) {
    const vet = await this.findOneOrFail(id);
    await this.repo.remove(vet);
  }

  async verifyVet(id: number) {
    const vet = await this.findOneOrFail(id);

    vet.isVerified = true;
    return this.repo.save(vet);
  }

  private handleDatabaseError(error: unknown): never {
    if (
      error instanceof QueryFailedError &&
      typeof error.driverError === 'object' &&
      error.driverError !== null &&
      'code' in error.driverError &&
      error.driverError.code === '23505'
    ) {
      throw new ConflictException('Ja existe um veterinario com este e-mail.');
    }

    throw error;
  }
}
