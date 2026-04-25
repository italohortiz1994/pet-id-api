import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePetNewsImageDto {
  @IsString()
  imageUrl!: string;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}
