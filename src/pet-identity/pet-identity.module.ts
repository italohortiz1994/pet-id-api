import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PetsModule } from '../pets/pets.module';
import { PetIdentity } from './entities/pet-identity.entity';
import { PublicProfileController } from './public-profile/public-profile.controller';
import { PetIdentityController } from './pet-identity.controller';
import { PetIdentityRepository } from './pet-identity.repository';
import { PetIdentityService } from './pet-identity.service';
import { QrCodeService } from './qr-code/qr-code.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetIdentity]), PetsModule],
  controllers: [PetIdentityController, PublicProfileController],
  providers: [PetIdentityService, QrCodeService, PetIdentityRepository],
  exports: [PetIdentityService],
})
export class PetIdentityModule {}
