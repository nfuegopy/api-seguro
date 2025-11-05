/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CamposFormularioService } from './campos-formulario.service';
import { CreateCampoFormularioDto } from './dto/create-campo-formulario.dto';
import { UpdateCampoFormularioDto } from './dto/update-campo-formulario.dto';

@Controller('campos-formulario')
export class CamposFormularioController {
  constructor(private readonly service: CamposFormularioService) {}

  @Post()
  create(@Body() dto: CreateCampoFormularioDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCampoFormularioDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
