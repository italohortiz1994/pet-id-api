import { Controller, Get, Param } from '@nestjs/common';
import { PetIdentityService } from '../pet-identity.service';

@Controller('public/pet')
export class PublicProfileController {
  constructor(private readonly petIdentityService: PetIdentityService) {}

  @Get(':publicId')
  getPublicProfile(@Param('publicId') publicId: string) {
    return this.petIdentityService.findByPublicId(publicId);
  }
}
