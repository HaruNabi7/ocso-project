import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { Employee } from './entities/employee.entity.js';
import {v4 as uuid} from "uuid";

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [{
    id: uuid(), 
    name : 'Josue',
    lastName : 'Costas',
    phoneNumber : 'xx23xx98xx'
  },{
    id: uuid(), 
    name: 'Rubi',
    lastName: 'Reyna',
    phoneNumber: 'x44xx22xx01'
  }]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid()
    this.employees.push(createEmployeeDto);
  }
  //Buscar todos los empelados
  findAll() {
        return this.employees;
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee)=>employee.id == id)[0];
    if (!employee) throw new NotFoundException();
    return employee;  
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    let employeeToUpdate = this.findOne(id); 
    employeeToUpdate = {
      ...employeeToUpdate,
      ...updateEmployeeDto, 
    }
    this.employees = this.employees.map((employee)=> {
      if (employee.id == id){
        employee = employeeToUpdate
      }
      return employee
    })
    return employeeToUpdate;
  }

  remove(id: string) {
    const employeeFound = this.findOne(id)
    this.employees = this.employees.filter((Employee)=> Employee.id != id);
    return this.employees;
  }
}
