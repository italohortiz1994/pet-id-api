import { Injectable, NotFoundException } from '@nestjs/common';
//import { randomUUID } from 'crypto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserResponseDTO } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
// depois vamos usar bcrypt
// import * as bcrypt from 'bcrypt';

interface User {
  id: string;
  name: string;
  birthDate: string;
  cpf: string;
  email: string;
  password: string;
}

@Injectable()
export class UsersService {
  private users: User[] = []; // simulacao (depois vira banco)

  private toResponseDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      birthDate: user.birthDate,
      cpf: user.cpf,
      email: user.email,
    };
  }

  // Criar usuario
  create(data: CreateUserDTO): UserResponseDTO {
    const user: User = {
      //id: randomUUID(),
      id: Date.now().toString(),
      ...data,
    };

    // (producao) hash da senha
    // user.password = await bcrypt.hash(data.password, 10);

    this.users.push(user);

    return this.toResponseDTO(user);
  }

  // Buscar todos
  findAll(): UserResponseDTO[] {
    return this.users.map((user) => this.toResponseDTO(user));
  }

  // Buscar por ID
  findById(id: string): UserResponseDTO {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    return this.toResponseDTO(user);
  }

  // Buscar por email (essencial pro login)
  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  // Atualizar usuario
  update(id: string, data: UpdateUserDTO): UserResponseDTO {
    const user = this.users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    Object.assign(user, data);

    return this.toResponseDTO(user);
  }

  // Remover usuario
  removeUser(id: string) {
    const index = this.users.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    this.users.splice(index, 1);

    return { message: 'Usuario removido com sucesso' };
  }
}
