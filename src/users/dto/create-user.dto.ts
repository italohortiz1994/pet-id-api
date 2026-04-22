import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDTO {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name!: string;

  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  birthDate!: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  cpf!: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail({}, { message: 'E-mail inválido' })
  email!: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres' })
  password!: string;
}
