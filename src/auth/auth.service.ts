import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity.js';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  registerUser(createUserDto: CreateUserDto) {
    createUserDto.userPassword = bcrypt.hashSync(createUserDto.userPassword, 5);
    return this.userRepository.save(createUserDto);
  }

 async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        userEmail: createUserDto.userEmail,
      },
    });

    if (!user) throw new UnauthorizedException('No autorizado');

    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword);
    if (!match) throw new UnauthorizedException('No autorizado');
    return user;
  }
}