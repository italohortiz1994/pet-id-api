import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePetCommentDto {
  @IsOptional()
  @IsUUID()
  petId?: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsString()
  content!: string;
}
