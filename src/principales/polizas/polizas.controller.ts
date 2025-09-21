/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PolizasService } from './polizas.service';
import { CreatePolizaDto } from './dto/create-poliza.dto';
import { UpdatePolizaDto } from './dto/update-poliza.dto';

@Controller('polizas')
export class PolizasController {
  constructor(private readonly polizasService: PolizasService) {}

  @Post()
  create(@Body() createPolizaDto: CreatePolizaDto) {
    return this.polizasService.create(createPolizaDto);
  }

  @Post('masivo')
  createMasivo(@Body() dtos: CreatePolizaDto[]) {
    return this.polizasService.createMasivo(dtos);
  }

  @Get()
  findAll() {
    return this.polizasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.polizasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePolizaDto: UpdatePolizaDto) {
    return this.polizasService.update(+id, updatePolizaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.polizasService.remove(+id);
  }
}