import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './constans/login-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

 registerUser(createUserDto: CreateUserDto) {
  createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
  const newUser = this.userRepository.create({
    ...createUserDto,
    userRoles: ['Employee'], // asigna el rol base
  });
  return this.userRepository.save(newUser);
}

  async loginUser(loginUserDto: LoginUserDto) {

    const user = await this.userRepository.findOne({
      where: {
        userEmail: loginUserDto.userEmail,
      },
    });
    if (!user) {
      throw new UnauthorizedException("No estas autorizado");
    }
    const match = await bcrypt.compare(
      loginUserDto.userPassword,
      user.userPassword,
    );
    if (!match) throw new UnauthorizedException("No estas autorizado");
    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles,
    }
    const token = this.jwtService.sign(
      payload
    );
    return token;
  
  }

  async updateUser(userEmail: string, updateUserDto: UpdateUserDto) {
    const newUserData = await this.userRepository.preload({
    userEmail,
    ...updateUserDto,
  });


  if (!newUserData) {
    throw new UnauthorizedException('Usuario no encontrado');
  }

  return this.userRepository.save(newUserData);
}
}