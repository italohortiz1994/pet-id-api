import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { PetFriendshipStatus } from '../enums/pet-friendship-status.enum';

export class CreatePetFriendshipDto {
  @IsUUID()
  requesterPetId!: string;

  @IsUUID()
  addresseePetId!: string;

  @IsOptional()
  @IsEnum(PetFriendshipStatus)
  status?: PetFriendshipStatus;
}
