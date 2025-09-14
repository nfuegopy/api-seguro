/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuRolService } from './menu-rol.service';
import { CreateMenuRolDto } from './dto/create-menu-rol.dto';
import { UpdateMenuRolDto } from './dto/update-menu-rol.dto';

@Controller('menu-rol')
export class MenuRolController {
  constructor(private readonly menuRolService: MenuRolService) {}

  @Post()
  create(@Body() createMenuRolDto: CreateMenuRolDto) {
    return this.menuRolService.create(createMenuRolDto);
  }

  @Get()
  findAll() {
    return this.menuRolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuRolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuRolDto: UpdateMenuRolDto) {
    return this.menuRolService.update(+id, updateMenuRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuRolService.remove(+id);
  }
}
