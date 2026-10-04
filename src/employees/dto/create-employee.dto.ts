import { IsEmail, IsObject, IsOptional, IsString, MaxLength } from 'class-validator';
import { Employee } from '../entities/employee.entity.js';
import { Location } from '../../locations/entities/location.entity.js';

export class CreateEmployeeDto extends Employee {
  @IsString()
  @MaxLength(30)
  declare employeeName: string;

  @IsString()
  @MaxLength(70)
  declare employeeLastName: string;

  @IsString()
  @MaxLength(10)
  declare employeePhoneNumber: string;

  @IsString()
  @IsEmail()
  declare employeeEmail: string;

  @IsOptional()
  @IsObject()
  declare location: Location;
}