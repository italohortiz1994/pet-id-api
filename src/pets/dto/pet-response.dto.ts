import { Expose } from 'class-transformer';

export class PetResponseDTO {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  breed!: string;

  @Expose()
  age!: number;

  @Expose()
  gender!: string;

  @Expose()
  userId!: string | null;
}
