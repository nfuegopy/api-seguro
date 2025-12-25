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
import { VehiculoModelosService } from './vehiculo_modelos.service';
import { CreateVehiculoModeloDto } from './dto/create-vehiculo-modelo.dto';
import { UpdateVehiculoModeloDto } from './dto/update-vehiculo-modelo.dto';

@Controller('vehiculo-modelos')
export class VehiculoModelosController {
  constructor(
    private readonly vehiculoModelosService: VehiculoModelosService,
  ) {}

  @Post()
  create(@Body() createVehiculoModeloDto: CreateVehiculoModeloDto) {
    return this.vehiculoModelosService.create(createVehiculoModeloDto);
  }

  @Get()
  findAll() {
    return this.vehiculoModelosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculoModelosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVehiculoModeloDto: UpdateVehiculoModeloDto,
  ) {
    return this.vehiculoModelosService.update(id, updateVehiculoModeloDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.vehiculoModelosService.remove(id);
  }
}
