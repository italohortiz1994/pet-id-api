import { IsNotEmpty } from 'class-validator';

export class CreatePetDTO {
  @IsNotEmpty({ message: 'Nome do animal é obrigatório' })
  name!: string;

  @IsNotEmpty({ message: 'Raça do animal é obrigatória' })
  breed!: string;

  @IsNotEmpty({ message: 'Idade do animal é obrigatória' })
  age!: number;

  @IsNotEmpty({ message: 'Sexo do animal é obrigatório' })
  gender!: string;
}
