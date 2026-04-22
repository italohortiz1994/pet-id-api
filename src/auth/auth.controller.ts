import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() data: LoginDTO) {
    return this.authService.login(data);
  }

  @Post('/register')
  register(@Body() data: RegisterDTO) {
    return this.authService.registerUser(data);
  }
}
