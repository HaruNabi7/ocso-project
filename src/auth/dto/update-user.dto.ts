import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

export class UpdateAuthDto extends PartialType(CreateUserDto) {}
