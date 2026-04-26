import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreatePetDTO {
  @IsNotEmpty({ message: 'Nome do animal e obrigatorio' })
  name!: string;

  @IsNotEmpty({ message: 'Raca do animal e obrigatoria' })
  breed!: string;

  @IsNotEmpty({ message: 'Idade do animal e obrigatoria' })
  age!: number;

  @IsNotEmpty({ message: 'Sexo do animal e obrigatorio' })
  gender!: string;

  @IsOptional()
  @IsUUID()
  userId?: string;
}
