import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVetDto } from './dto/create-vet.dto';
import { Vet } from './entities/vet.entity';

@Injectable()
export class VetsService {
  constructor(
    @InjectRepository(Vet)
    private readonly repo: Repository<Vet>,
  ) {}

  create(dto: CreateVetDto) {
    return this.repo.save(dto);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async verifyVet(id: number) {
    const vet = await this.findOne(id);

    if (!vet) {
      throw new NotFoundException('Veterinário não encontrado');
    }

    vet.isVerified = true;
    return this.repo.save(vet);
  }
}
