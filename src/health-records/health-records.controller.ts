import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HealthRecordsService } from './health-records.service';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { CreateVaccineDto } from './dto/create-vaccine.dto';

@Controller('health-records')
export class HealthRecordsController {
  constructor(private readonly service: HealthRecordsService) {}

  @Post()
  create(@Body() dto: CreateHealthRecordDto) {
    return this.service.create(dto);
  }

  @Post('vaccines')
  createVaccine(@Body() dto: CreateVaccineDto) {
    return this.service.createVaccine(dto);
  }

  @Get('vaccines/pet/:petId')
  findVaccinesByPet(@Param('petId') petId: string) {
    return this.service.findVaccinesByPet(petId);
  }

  @Get('pet/:petId')
  findByPet(@Param('petId') petId: string) {
    return this.service.findByPet(petId);
  }
}
