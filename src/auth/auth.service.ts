import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDTO) {
    const email = data.email.trim().toLowerCase();
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuario nao encontrado');
    }

    if (user.password !== data.password) {
      throw new UnauthorizedException('Senha invalida');
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    return {
      message: 'Login realizado com sucesso',
      access_token: this.jwtService.sign(payload),
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
