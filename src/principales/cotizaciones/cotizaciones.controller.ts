/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Controller, Post, Body, Get } from '@nestjs/common';
import { CotizacionesService } from './cotizaciones.service';
import { CreateCotizacionDto } from './dto/create-cotizacion.dto';

@Controller('cotizaciones')
export class CotizacionesController {
  constructor(private readonly cotizacionesService: CotizacionesService) {}

  // eslint-disable-next-line prettier/prettier
  @Post()
  async crearCotizacion(@Body() createCotizacionDto: CreateCotizacionDto) {
    // eslint-disable-next-line prettier/prettier
    return await this.cotizacionesService.crear(createCotizacionDto);
  }

  @Get()
  // eslint-disable-next-line prettier/prettier
  async listarCotizaciones() {
    // eslint-disable-next-line prettier/prettier
    return await this.cotizacionesService.findAll();
  }
}
