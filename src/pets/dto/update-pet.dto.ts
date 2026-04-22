import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdatePetDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'Nome do animal é obrigatorio' })
  name?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Raca do animal é obrigatoria' })
  breed?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Idade do animal é obrigatoria' })
  age?: number;

  @IsOptional()
  @IsNotEmpty({ message: 'Sexo do animal é obrigatorio' })
  gender?: string;
}
