import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePetDTO } from './dto/create-pet.dto';
import { UpdatePetDTO } from './dto/update-pet.dto';
import { PetsService } from './pets.service';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  createPet(@Body() data: CreatePetDTO) {
    return this.petsService.create(data);
  }

  @Get()
  findAllPets() {
    return this.petsService.findAll();
  }

  @Get(':id')
  findPetById(@Param('id') id: string) {
    return this.petsService.findById(id);
  }

  @Patch(':id')
  updatePet(@Param('id') id: string, @Body() data: UpdatePetDTO) {
    return this.petsService.updatePet(id, data);
  }

  @Delete(':id')
  deletePet(@Param('id') id: string) {
    return this.petsService.removePet(id);
  }
}
