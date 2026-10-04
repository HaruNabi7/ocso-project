import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto as LoginUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createUserDto: LoginUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  @Post("login")
login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }
  @Patch(':email')
updateUser(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
  return this.authService.updateUser(email, updateUserDto);
  }
}