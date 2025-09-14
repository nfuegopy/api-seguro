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
import { VehiculoMarcasService } from './vehiculo_marcas.service';
import { CreateVehiculoMarcaDto } from './dto/create-vehiculo-marca.dto';
import { UpdateVehiculoMarcaDto } from './dto/update-vehiculo-marca.dto';

@Controller('vehiculo-marcas')
export class VehiculoMarcasController {
  constructor(private readonly vehiculoMarcasService: VehiculoMarcasService) {}

  @Post()
  create(@Body() createVehiculoMarcaDto: CreateVehiculoMarcaDto) {
    return this.vehiculoMarcasService.create(createVehiculoMarcaDto);
  }

  @Get()
  findAll() {
    return this.vehiculoMarcasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiculoMarcasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVehiculoMarcaDto: UpdateVehiculoMarcaDto,
  ) {
    return this.vehiculoMarcasService.update(+id, updateVehiculoMarcaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiculoMarcasService.remove(+id);
  }
}