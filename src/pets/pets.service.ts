import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePetDTO } from './dto/create-pet.dto';
import { PetResponseDTO } from './dto/pet-response.dto';
import { UpdatePetDTO } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,
  ) {}

  private toResponseDTO(pet: Pet): PetResponseDTO {
    return {
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      gender: pet.gender,
      userId: pet.userId,
    };
  }

  async create(data: CreatePetDTO): Promise<PetResponseDTO> {
    const pet = this.petsRepository.create(data);
    const savedPet = await this.petsRepository.save(pet);

    return this.toResponseDTO(savedPet);
  }

  async findAll(): Promise<PetResponseDTO[]> {
    const pets = await this.petsRepository.find();

    return pets.map((pet) => this.toResponseDTO(pet));
  }

  async findById(id: string): Promise<PetResponseDTO> {
    const pet = await this.petsRepository.findOne({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return this.toResponseDTO(pet);
  }

  async updatePet(id: string, data: UpdatePetDTO): Promise<PetResponseDTO> {
    const pet = await this.petsRepository.findOne({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    Object.assign(pet, data);

    const updatedPet = await this.petsRepository.save(pet);

    return this.toResponseDTO(updatedPet);
  }

  async removePet(id: string): Promise<string> {
    const pet = await this.petsRepository.findOne({
      where: { id },
    });

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    await this.petsRepository.remove(pet);

    return 'Pet deleted successfully';
  }
}
