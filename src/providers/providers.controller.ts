import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProvidersService } from './providers.service.js';
import { CreateProviderDto } from './dto/create-provider.dto.js';
import { UpdateProviderDto } from './dto/update-provider.dto.js';
import { get } from 'http';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { User } from '../auth/entities/user.entity.js';
import { UserData } from '../auth/decorators/user.decorator.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Auth } from '../auth/decorators/auth.decorators.js';
import { ROLES } from '../auth/constans/roles.constans.js';
import { ApiAuth } from '../auth/decorators/api.decorator.js';

@ApiAuth()
@Controller('providers') 
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Auth(ROLES.Manager)
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

   
  @Auth(ROLES.Employee, ROLES.Manager)
  @Get()
  findAll(@UserData() user: User) {
    if (user.userRoles.includes('Employee')) throw new NotFoundException("No se encontro el usuario");
    console.log(user);
    return this.providersService.findAll();
  }
  
  @Auth(ROLES.Employee, ROLES.Manager)
  @Get(':name')
  findByName(@Param('name') name : string){
    return this.providersService.findOneByName(name)
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if(!provider) throw new NotFoundException()
  }

  @Auth( ROLES.Manager)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth( ROLES.Manager)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
