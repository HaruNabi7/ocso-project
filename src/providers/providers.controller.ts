import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ProvidersService } from './providers.service.js';
import { CreateProviderDto } from './dto/create-provider.dto.js';
import { UpdateProviderDto } from './dto/update-provider.dto.js';
import { get } from 'http';
import { AuthGuard } from '../auth/guards/auth.guard.js';
import { User } from '../auth/entities/user.entity.js';
import { UserData } from '../auth/decorators/user.decorator.js';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }



  @Get()
  findAll(@UserData() user: User) {
    if (!user) throw new NotFoundException("No se encontro el usuario");
    console.log(user);
    return this.providersService.findAll();
  }
  
  @Get(':name')
  findByName(@Param('name') name : string){
    return this.providersService.findOneByName(name)
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if(!provider) throw new NotFoundException()
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}
