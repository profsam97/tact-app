import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { loginSchema, LoginSchema } from './dto/login.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body(new ZodValidationPipe(loginSchema)) loginDto: LoginSchema) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(loginSchema)) loginDto: LoginSchema,
  ) {
    return this.userService.create(loginDto as Prisma.UserCreateInput);
  }
}
