import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserResponseDTO } from './dto/response-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  private toResponseDTO(user: User): UserResponseDTO {
    return {
      id: user.id,
      name: user.name,
      birthDate: user.birthDate,
      cpf: user.cpf,
      email: user.email,
    };
  }

  async create(data: CreateUserDTO): Promise<UserResponseDTO> {
    const email = data.email.trim().toLowerCase();
    const existingUser = await this.usersRepository.findOne({
      where: [{ email: ILike(email) }, { cpf: data.cpf }],
    });

    if (existingUser) {
      throw new ConflictException('Ja existe um usuario com este email ou CPF');
    }

    const user = this.usersRepository.create({
      ...data,
      email,
    });
    const savedUser = await this.usersRepository.save(user);

    return this.toResponseDTO(savedUser);
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const users = await this.usersRepository.find();

    return users.map((user) => this.toResponseDTO(user));
  }

  async findById(id: string): Promise<UserResponseDTO> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    return this.toResponseDTO(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email: ILike(email.trim().toLowerCase()) },
    });
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserResponseDTO> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    const email = data.email?.trim().toLowerCase();

    if (email && email !== user.email) {
      const emailInUse = await this.usersRepository.findOne({
        where: { email: ILike(email) },
      });

      if (emailInUse) {
        throw new ConflictException('Ja existe um usuario com este email');
      }
    }

    Object.assign(user, {
      ...data,
      ...(email ? { email } : {}),
    });

    const updatedUser = await this.usersRepository.save(user);

    return this.toResponseDTO(updatedUser);
  }

  async removeUser(id: string): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    await this.usersRepository.remove(user);

    return { message: 'Usuario removido com sucesso' };
  }
}
