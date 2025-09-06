/* eslint-disable prettier/prettier */

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PaisService } from './pais.service';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';

@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @Post()
  create(@Body() createPaisDto: CreatePaisDto) {
    return this.paisService.create(createPaisDto);
  }

  @Post('masivo')
  createMasivo(@Body() createPaisDtos: CreatePaisDto[]) {
    return this.paisService.createMasivo(createPaisDtos);
  }

  @Get()
  findAll(@Query('nombre') nombre?: string) {
    return this.paisService.findAll(nombre);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaisDto: UpdatePaisDto) {
    return this.paisService.update(+id, updatePaisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paisService.remove(+id);
  }
}
