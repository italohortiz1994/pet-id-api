import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePetNewsDto {
  @IsOptional()
  @IsString()
  petId?: string;

  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  summary?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  sourceName?: string;

  @IsOptional()
  @IsString()
  sourceUrl?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  @IsOptional()
  @IsDateString()
  publishedAt?: string;
}
