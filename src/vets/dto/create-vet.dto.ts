import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVetDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  crmv!: string;

  @IsOptional()
  @IsString()
  clinicName?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
