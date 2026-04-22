import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHealthRecordDto } from './dto/create-health-record.dto';
import { CreateVaccineDto } from './dto/create-vaccine.dto';
import { HealthRecord } from './entities/health-record.entity';
import { Vaccine } from './entities/vaccine.entity';

@Injectable()
export class HealthRecordsService {
  constructor(
    @InjectRepository(HealthRecord)
    private readonly repo: Repository<HealthRecord>,
    @InjectRepository(Vaccine)
    private readonly vaccineRepo: Repository<Vaccine>,
  ) {}

  create(dto: CreateHealthRecordDto) {
    const record = new HealthRecord();

    record.petId = dto.petId;
    record.title = dto.title;
    record.description =
      typeof dto.description === 'string' ? dto.description : null;
    record.type = dto.type;
    record.date = typeof dto.date === 'string' ? new Date(dto.date) : null;
    record.fileUrl = typeof dto.fileUrl === 'string' ? dto.fileUrl : null;

    return this.repo.save(record);
  }

  createVaccine(dto: CreateVaccineDto) {
    const vaccine = new Vaccine();

    vaccine.petId = dto.petId;
    vaccine.name = dto.name;
    vaccine.applicationDate = new Date(dto.applicationDate);
    vaccine.nextDoseDate =
      typeof dto.nextDoseDate === 'string' ? new Date(dto.nextDoseDate) : null;
    vaccine.veterinarianName =
      typeof dto.veterinarianName === 'string' ? dto.veterinarianName : null;
    vaccine.clinicName =
      typeof dto.clinicName === 'string' ? dto.clinicName : null;
    vaccine.notes = typeof dto.notes === 'string' ? dto.notes : null;

    return this.vaccineRepo.save(vaccine);
  }

  findVaccinesByPet(petId: string) {
    return this.vaccineRepo.find({
      where: { petId },
      order: { applicationDate: 'DESC' },
    });
  }

  findByPet(petId: string) {
    return this.repo.find({
      where: { petId },
      order: { date: 'DESC' },
    });
  }
}
