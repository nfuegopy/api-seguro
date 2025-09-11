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
  UseGuards,
} from '@nestjs/common';
import { PaisService } from './pais.service';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

// @Controller('pais') define la ruta base para todos los endpoints: http://localhost:3000/pais
@Controller('pais')
@UseGuards(ApiKeyGuard)
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  // POST /pais
  @Post()
  create(@Body() createPaisDto: CreatePaisDto) {
    return this.paisService.create(createPaisDto);
  }

  // POST /pais/masivo
  @Post('masivo')
  createMasivo(@Body() createPaisDtos: CreatePaisDto[]) {
    return this.paisService.createMasivo(createPaisDtos);
  }

  // GET /pais  o  GET /pais?nombre=Para
  @Get()
  findAll(@Query('nombre') nombre?: string) {
    // @Query('nombre') captura el parámetro de la URL (ej: ?nombre=valor)
    return this.paisService.findAll(nombre);
  }

  // GET /pais/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paisService.findOne(+id); // el '+' convierte el string a número
  }

  // PATCH /pais/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaisDto: UpdatePaisDto) {
    return this.paisService.update(+id, updatePaisDto);
  }

  // DELETE /pais/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paisService.remove(+id);
  }
}
