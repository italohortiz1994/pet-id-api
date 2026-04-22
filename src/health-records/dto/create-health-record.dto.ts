import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { RecordType } from '../enums/record-type.enum';

export class CreateHealthRecordDto {
  @IsString()
  petId!: string;

  @IsString()
  title!: string;

  @IsOptional()
  description?: string;

  @IsEnum(RecordType)
  type!: RecordType;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  fileUrl!: string;
}
