import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'Nome e obrigatorio' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'E-mail invalido' })
  email?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Senha e obrigatoria' })
  @MinLength(6, { message: 'Senha deve ter no minimo 6 caracteres' })
  password?: string;
}
