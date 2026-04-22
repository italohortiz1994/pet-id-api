import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { PetIdentityService } from './pet-identity.service';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('pet-identity')
export class PetIdentityController {
  constructor(private readonly service: PetIdentityService) {}
  @Post(':petId')
  createPetIdentity(@Param('petId') petId: string) {
    return this.service.create(petId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto) {
    return this.service.updateStatus(id, dto.status);
  }
}
