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
import { SeccionProductoPublicadoService } from './seccion-producto-publicado.service';
import { CreateSeccionProductoPublicadoDto } from './dto/create-seccion-producto-publicado.dto';
import { UpdateSeccionProductoPublicadoDto } from './dto/update-seccion-producto-publicado.dto';

@Controller('seccion-producto-publicado')
export class SeccionProductoPublicadoController {
  constructor(private readonly service: SeccionProductoPublicadoService) {}

  @Post()
  create(@Body() dto: CreateSeccionProductoPublicadoDto) {
    return this.service.create(dto);
  }

  // --- NUEVO ENDPOINT PÚBLICO ---
  @Get('publicos')
  findAllPublic() {
    return this.service.findAll();
  }
  // --- FIN DE NUEVO ENDPOINT ---

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
    @Body() dto: UpdateSeccionProductoPublicadoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
