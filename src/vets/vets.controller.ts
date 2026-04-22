import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { VetsService } from './vets.service';
import { CreateVetDto } from './dto/create-vet.dto';

@Controller('vets')
export class VetsController {
  constructor(private readonly service: VetsService) {}

  @Post()
  create(@Body() dto: CreateVetDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Patch(':id/verify')
  verify(@Param('id') id: number) {
    return this.service.verifyVet(Number(id));
  }
}
