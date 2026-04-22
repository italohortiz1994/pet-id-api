import { Vet } from './entities/vet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { VetsService } from './vets.service';
import { VetsController } from './vets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vet])],
  controllers: [VetsController],
  providers: [VetsService],
  exports: [VetsService],
})
export class VetsModule {}
