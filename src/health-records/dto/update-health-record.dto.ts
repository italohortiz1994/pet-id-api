import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { RecordType } from '../enums/record-type.enum';

export class UpdateHealthRecordDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(RecordType)
  type?: RecordType;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  fileUrl?: string;
}
