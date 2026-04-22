import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthRecord } from './entities/health-record.entity';
import { Vaccine } from './entities/vaccine.entity';
import { HealthRecordsController } from './health-records.controller';
import { HealthRecordsService } from './health-records.service';

@Module({
  imports: [TypeOrmModule.forFeature([HealthRecord, Vaccine])],
  controllers: [HealthRecordsController],
  providers: [HealthRecordsService],
  exports: [HealthRecordsService],
})
export class HealthRecordsModule {}
