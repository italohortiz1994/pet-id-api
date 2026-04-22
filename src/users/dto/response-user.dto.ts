/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Expose } from 'class-transformer';

export class UserResponseDTO {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  birthDate!: string;

  @Expose()
  cpf!: string;

  @Expose()
  email!: string;
}
