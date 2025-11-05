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
import { ProductoFormularioCamposService } from './producto-formulario-campos.service';
import { CreateProductoFormularioCampoDto } from './dto/create-producto-formulario-campo.dto';
import { UpdateProductoFormularioCampoDto } from './dto/update-producto-formulario-campo.dto';

@Controller('producto-formulario-campos')
export class ProductoFormularioCamposController {
  constructor(private readonly service: ProductoFormularioCamposService) {}

  @Post()
  create(@Body() dto: CreateProductoFormularioCampoDto) {
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
    @Body() dto: UpdateProductoFormularioCampoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
