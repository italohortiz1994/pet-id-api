import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePetCommentDto {
  @IsOptional()
  petId?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsString()
  content!: string;
}
