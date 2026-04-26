import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name!: string;

  @IsNotEmpty({ message: 'Data de nascimento é obrigatória' })
  birthDate!: string;

  @IsNotEmpty({ message: 'CPF é obrigatório' })
  cpf!: string;

  @IsEmail({}, { message: 'E-mail inválido' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email!: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password!: string;
}
