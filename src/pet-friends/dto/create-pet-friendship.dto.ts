import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PetFriendshipStatus } from '../enums/pet-friendship-status.enum';

export class CreatePetFriendshipDto {
  @IsString()
  requesterPetId!: string;

  @IsString()
  addresseePetId!: string;

  @IsOptional()
  @IsEnum(PetFriendshipStatus)
  status?: PetFriendshipStatus;
}
