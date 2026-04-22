import { IsEnum } from 'class-validator';

export enum PetStatus {
  ACTIVE = 'ACTIVE',
  LOST = 'LOST',
  FOUND = 'FOUND',
}

export class UpdateStatusDto {
  @IsEnum(PetStatus, {
    message: 'Status deve ser: ACTIVE, LOST ou FOUND',
  })
  status!: PetStatus;
}
