import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PetIdentity } from './entities/pet-identity.entity';

@Injectable()
export class PetIdentityRepository {
  constructor(
    @InjectRepository(PetIdentity)
    private readonly repository: Repository<PetIdentity>,
  ) {}

  create(data: Partial<PetIdentity>): PetIdentity {
    return this.repository.create(data);
  }

  save(identity: PetIdentity): Promise<PetIdentity> {
    return this.repository.save(identity);
  }

  findByPublicId(publicId: string): Promise<PetIdentity | null> {
    return this.repository.findOne({
      where: { publicId },
    });
  }

  findByPetId(petId: string): Promise<PetIdentity | null> {
    return this.repository.findOne({
      where: { petId },
    });
  }

  findById(id: string): Promise<PetIdentity | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  findByPublicIdOrId(identifier: string): Promise<PetIdentity | null> {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        identifier,
      );

    if (isUuid) {
      return this.findById(identifier);
    }

    return this.findByPublicId(identifier);
  }
}
