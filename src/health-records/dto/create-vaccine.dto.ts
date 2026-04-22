import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVaccineDto {
  @IsString()
  petId!: string;

  @IsString()
  @IsNotEmpty()
  name!: string; // Ex: Antirrábica

  @IsDateString()
  applicationDate!: string;

  @IsOptional()
  @IsDateString()
  nextDoseDate?: string;

  @IsOptional()
  @IsString()
  veterinarianName?: string;

  @IsOptional()
  @IsString()
  clinicName?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
