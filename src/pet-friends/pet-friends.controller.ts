import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePetFriendshipDto } from './dto/create-pet-friendship.dto';
import { UpdatePetFriendshipDto } from './dto/update-pet-friendship.dto';
import { PetFriendshipStatus } from './enums/pet-friendship-status.enum';
import { PetFriendsService } from './pet-friends.service';

@Controller('pet-friends')
export class PetFriendsController {
  constructor(private readonly service: PetFriendsService) {}

  @Post()
  create(@Body() dto: CreatePetFriendshipDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(
    @Query('petId') petId?: string,
    @Query('status') status?: PetFriendshipStatus,
  ) {
    return this.service.findAll(petId, status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePetFriendshipDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}
