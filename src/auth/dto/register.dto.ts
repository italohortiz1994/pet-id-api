import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name!: string;

  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  birthDate!: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  cpf!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password!: string;
}
