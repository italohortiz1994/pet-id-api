import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class PetNewsQueryDto {
  @IsOptional()
  @IsString()
  petId?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsBooleanString()
  published?: string;
}
