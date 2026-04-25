import { IsString } from 'class-validator';

export class UpdatePetCommentDto {
  @IsString()
  content!: string;
}
