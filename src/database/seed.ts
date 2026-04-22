import { AppDataSource } from './data-source';
import { PetIdentity } from '../pet-identity/entities/pet-identity.entity';
import { Pet } from '../pets/entities/pet.entity';

async function seed(): Promise<void> {
  await AppDataSource.initialize();

  try {
    const petRepository = AppDataSource.getRepository(Pet);
    const petIdentityRepository = AppDataSource.getRepository(PetIdentity);

    const existingPet = await petRepository.findOne({
      where: { name: 'Rambo', breed: 'Vira-lata' },
    });

    const pet =
      existingPet ??
      (await petRepository.save(
        petRepository.create({
          name: 'Rambo',
          breed: 'Vira-lata',
          age: 4,
          gender: 'Macho',
        }),
      ));

    const existingIdentity = await petIdentityRepository.findOne({
      where: { petId: pet.id },
    });

    if (!existingIdentity) {
      await petIdentityRepository.save(
        petIdentityRepository.create({
          petId: pet.id,
          publicId: 'PET-DEMO01',
          status: 'ACTIVE',
          isPublic: true,
          publicUrl: 'https://petid.com/pet/PET-DEMO01',
          qrCodeUrl: 'seeded-demo-qr-code',
          showOwnerContact: true,
        }),
      );
    }
  } finally {
    await AppDataSource.destroy();
  }
}

void seed();
