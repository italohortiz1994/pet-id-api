import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from '../pets/entities/pet.entity';
import { PetFriendship } from './entities/pet-friendship.entity';
import { PetFriendsController } from './pet-friends.controller';
import { PetFriendsService } from './pet-friends.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetFriendship, Pet])],
  controllers: [PetFriendsController],
  providers: [PetFriendsService],
})
export class PetFriendsModule {}
