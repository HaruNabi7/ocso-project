import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RegionsService } from './regions.service.js';
import { CreateRegionDto } from './dto/create-region.dto.js';
import { UpdateRegionDto } from './dto/update-region.dto.js';
import { ROLES } from '../auth/constans/roles.constans.js';
import { Auth } from '../auth/decorators/auth.decorators.js';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  
  @Auth(ROLES.Employee, ROLES.Manager)
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionsService.create(createRegionDto);
  }

  @Auth(ROLES.Employee, ROLES.Manager)
  @Get()
  findAll() {
    return this.regionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionsService.findOne(+id);
  }

   @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionsService.update(+id, updateRegionDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionsService.remove(+id);
  }
}
