import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { VetsService } from './vets.service';
import { CreateVetDto } from './dto/create-vet.dto';
import { UpdateVetDto } from './dto/update-vet.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOneOrFail(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateVetDto) {
    return this.service.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }

  @Patch(':id/verify')
  verify(@Param('id') id: string) {
    return this.service.verifyVet(Number(id));
  }
}
