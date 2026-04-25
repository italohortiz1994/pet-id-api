import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetFriendshipDto } from './dto/create-pet-friendship.dto';
import { UpdatePetFriendshipDto } from './dto/update-pet-friendship.dto';
import { PetFriendship } from './entities/pet-friendship.entity';
import { PetFriendshipStatus } from './enums/pet-friendship-status.enum';

@Injectable()
export class PetFriendsService {
  constructor(
    @InjectRepository(PetFriendship)
    private readonly repo: Repository<PetFriendship>,
  ) {}

  async create(dto: CreatePetFriendshipDto) {
    if (dto.requesterPetId === dto.addresseePetId) {
      throw new BadRequestException('Um pet nao pode adicionar ele mesmo.');
    }

    const existing = await this.findExistingPair(
      dto.requesterPetId,
      dto.addresseePetId,
    );

    if (existing) {
      throw new ConflictException('Solicitacao de amizade ja existe.');
    }

    const friendship = this.repo.create({
      requesterPetId: dto.requesterPetId,
      addresseePetId: dto.addresseePetId,
      status: dto.status ?? PetFriendshipStatus.PENDING,
    });

    return this.repo.save(friendship);
  }

  findAll(petId?: string, status?: PetFriendshipStatus) {
    const query = this.repo
      .createQueryBuilder('friendship')
      .leftJoinAndSelect('friendship.requesterPet', 'requesterPet')
      .leftJoinAndSelect('friendship.addresseePet', 'addresseePet')
      .orderBy('friendship.createdAt', 'DESC');

    if (petId) {
      query.andWhere(
        '(friendship.requesterPetId = :petId OR friendship.addresseePetId = :petId)',
        { petId },
      );
    }

    if (status) {
      query.andWhere('friendship.status = :status', { status });
    }

    return query.getMany();
  }

  async update(id: number, dto: UpdatePetFriendshipDto) {
    const friendship = await this.findOne(id);
    friendship.status = dto.status;

    return this.repo.save(friendship);
  }

  async remove(id: number) {
    const friendship = await this.findOne(id);
    await this.repo.remove(friendship);

    return { message: 'Amizade removida com sucesso' };
  }

  private findExistingPair(requesterPetId: string, addresseePetId: string) {
    return this.repo
      .createQueryBuilder('friendship')
      .where(
        '(friendship.requesterPetId = :requesterPetId AND friendship.addresseePetId = :addresseePetId)',
        { requesterPetId, addresseePetId },
      )
      .orWhere(
        '(friendship.requesterPetId = :addresseePetId AND friendship.addresseePetId = :requesterPetId)',
        { requesterPetId, addresseePetId },
      )
      .getOne();
  }

  private async findOne(id: number) {
    const friendship = await this.repo.findOne({ where: { id } });

    if (!friendship) {
      throw new NotFoundException('Amizade nao encontrada');
    }

    return friendship;
  }
}
