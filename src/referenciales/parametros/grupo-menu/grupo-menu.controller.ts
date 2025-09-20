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
import { GrupoMenuService } from './grupo-menu.service';
import { CreateGrupoMenuDto } from './dto/create-grupo-menu.dto';
import { UpdateGrupoMenuDto } from './dto/update-grupo-menu.dto';

@Controller('grupo-menu')
export class GrupoMenuController {
  constructor(private readonly grupoMenuService: GrupoMenuService) {}

  @Post()
  create(@Body() createGrupoMenuDto: CreateGrupoMenuDto) {
    return this.grupoMenuService.create(createGrupoMenuDto);
  }

  @Get()
  findAll() {
    return this.grupoMenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.grupoMenuService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGrupoMenuDto: UpdateGrupoMenuDto,
  ) {
    return this.grupoMenuService.update(+id, updateGrupoMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.grupoMenuService.remove(+id);
  }
}
