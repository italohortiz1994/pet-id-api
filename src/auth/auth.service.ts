import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  login(data: LoginDTO) {
    const user = this.usersService.findByEmail(data.email);

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    if (user.password !== data.password) {
      throw new UnauthorizedException('Senha invalida');
    }

    return {
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  registerUser(data: RegisterDTO) {
    return this.usersService.create(data);
  }
}
