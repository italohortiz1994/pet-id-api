import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateVetDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  clinicName?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
