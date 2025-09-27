/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NivelesCoberturaService } from './niveles-coberturas.service';
import { CreateNivelCoberturaDto } from './dto/create-nivel-cobertura.dto';
import { UpdateNivelCoberturaDto } from './dto/update-nivel-cobertura.dto';

@Controller('niveles-cobertura')
export class NivelesCoberturasController {
  constructor(private readonly nivelesCoberturaService: NivelesCoberturaService) {}

  @Post()
  create(@Body() dto: CreateNivelCoberturaDto) {
    return this.nivelesCoberturaService.create(dto);
  }

  @Post('masivo')
  createMasivo(@Body() dtos: CreateNivelCoberturaDto[]) {
    return this.nivelesCoberturaService.createMasivo(dtos);
  }

  @Get()
  findAll(@Query('nombre') nombre?: string) {
    return this.nivelesCoberturaService.findAll(nombre);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nivelesCoberturaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateNivelCoberturaDto) {
    return this.nivelesCoberturaService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nivelesCoberturaService.remove(+id);
  }
}