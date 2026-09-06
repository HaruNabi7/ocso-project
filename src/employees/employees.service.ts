import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { Employee } from './entities/employee.entity.js';

@Injectable()
export class EmployeesService {
  private employees = [{
    id: 1, 
    name : 'Josue',
    lastName : 'Costas',
    phoneNumber : 'xx23xx98xx'
  },{
    id: 2, 
    name: 'Rubi',
    lastName: 'Reyna',
    phoneNumber: 'x44xx22xx01'
  }]
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length + 1
    this.employees.push(createEmployeeDto);
  }
  //Buscar todos los empelados
  findAll() {
        return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee)=>employee.id == id)[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
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

  remove(id: number) {
    this.employees = this.employees.filter((Employee)=> Employee.id != id);
    return this.employees;
  }
}
