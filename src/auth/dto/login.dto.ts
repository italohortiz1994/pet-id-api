import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail({}, { message: 'Email inválido' })
  email!: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'Senha é obrigatória' })
  password!: string;
}
