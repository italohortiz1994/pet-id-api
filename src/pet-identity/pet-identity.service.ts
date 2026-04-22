import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PetsService } from '../pets/pets.service';
import { PetIdentity } from './entities/pet-identity.entity';
import { PetIdentityRepository } from './pet-identity.repository';
import { QrCodeService } from './qr-code/qr-code.service';

@Injectable()
export class PetIdentityService {
  constructor(
    private readonly qrCodeService: QrCodeService,
    private readonly petIdentityRepository: PetIdentityRepository,
    private readonly petsService: PetsService,
  ) {}

  async create(petId: string) {
    const existingIdentity =
      await this.petIdentityRepository.findByPetId(petId);

    if (existingIdentity) {
      return existingIdentity;
    }

    const publicId = this.generatePublicId();
    const qrCode = await this.qrCodeService.generate(publicId);

    const identity = this.petIdentityRepository.create({
      petId,
      publicId,
      qrCodeUrl: qrCode,
      publicUrl: `https://petid.com/pet/${publicId}`,
    });

    return this.petIdentityRepository.save(identity);
  }

  private generatePublicId(): string {
    return 'PET-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  private async getIdentityByIdentifier(
    id: string,
  ): Promise<PetIdentity | null> {
    const identity = await this.petIdentityRepository.findByPublicIdOrId(id);

    if (!identity) {
      throw new NotFoundException('Identidade do pet nao encontrada');
    }

    return identity;
  }

  async updateStatus(
    id: string,
    status: PetIdentity['status'],
  ): Promise<PetIdentity> {
    const identity = await this.getIdentityByIdentifier(id);

    identity!.status = status;

    return this.petIdentityRepository.save(identity!);
  }

  async findByPublicId(publicId: string) {
    const identity = await this.petIdentityRepository.findByPublicId(publicId);

    if (!identity) {
      throw new NotFoundException('Pet nao encontrado');
    }

    if (!identity.isPublic) {
      throw new ForbiddenException('Perfil privado');
    }

    const pet = await this.petsService.findById(identity.petId);

    return {
      id: identity.publicId,
      status: identity.status,
      pet: {
        name: pet.name,
        breed: pet.breed,
        age: pet.age,
        gender: pet.gender,
      },
      contact: identity.showOwnerContact
        ? {
            message: 'Entrar em contato com o tutor',
          }
        : null,
    };
  }
}
