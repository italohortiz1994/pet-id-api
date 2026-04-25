import { IsEnum } from 'class-validator';
import { PetFriendshipStatus } from '../enums/pet-friendship-status.enum';

export class UpdatePetFriendshipDto {
  @IsEnum(PetFriendshipStatus)
  status!: PetFriendshipStatus;
}
