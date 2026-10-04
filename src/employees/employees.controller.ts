import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { EmployeesService } from './employees.service.js';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import 'multer';
import { Auth } from '../auth/decorators/auth.decorators.js';
import { ROLES } from '../auth/constans/roles.constans.js';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Auth( ROLES.Manager)
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Auth(ROLES.Employee, ROLES.Manager)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() file: Express.Multer.File){
    return "Ok"
  }

  @Auth(ROLES.Manager)
  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Auth(ROLES.Manager)
  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({version: '4'})) 
    id: string
  ){
    return this.employeesService.findOne(id); // el + es como un parseInt(id) y sirve para convertir en numeros
  }

  @Auth(ROLES.Employee, ROLES.Manager)
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) 
  id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Auth( ROLES.Manager)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.employeesService.remove(id);
  }
}
