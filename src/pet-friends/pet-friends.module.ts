import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetFriendship } from './entities/pet-friendship.entity';
import { PetFriendsController } from './pet-friends.controller';
import { PetFriendsService } from './pet-friends.service';

@Module({
  imports: [TypeOrmModule.forFeature([PetFriendship])],
  controllers: [PetFriendsController],
  providers: [PetFriendsService],
})
export class PetFriendsModule {}
