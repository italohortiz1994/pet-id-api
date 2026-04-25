import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVetDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail({}, { message: 'Informe um e-mail valido.' })
  @IsNotEmpty({ message: 'Informe o e-mail do veterinario.' })
  email!: string;

  @IsString()
  @IsNotEmpty()
  crmv!: string;

  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsString()
  clinicName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
