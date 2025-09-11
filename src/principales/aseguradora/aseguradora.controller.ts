/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AseguradoraService } from './aseguradora.service';
import { CreateAseguradoraDto } from './dto/create-aseguradora.dto';
import { UpdateAseguradoraDto } from './dto/update-aseguradora.dto';

@Controller('aseguradora')
export class AseguradoraController {
  constructor(private readonly aseguradoraService: AseguradoraService) {}

  @Post()
  create(@Body() dto: CreateAseguradoraDto) {
    return this.aseguradoraService.create(dto);
  }

  @Post('masivo')
  createMasivo(@Body() dtos: CreateAseguradoraDto[]) {
    return this.aseguradoraService.createMasivo(dtos);
  }

  @Get()
  findAll(@Query('nombre') nombre?: string) {
    return this.aseguradoraService.findAll(nombre);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aseguradoraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAseguradoraDto) {
    return this.aseguradoraService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aseguradoraService.remove(+id);
  }
}
