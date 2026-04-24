import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { UserResponseDTO } from './dto/response-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createTutor(@Body() data: CreateUserDTO) {
    return this.usersService.create(data);
  }

  @Get()
  findAllUsers(): Promise<UserResponseDTO[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDTO) {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.removeUser(id);
  }
}
