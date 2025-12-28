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
import { ProductosSeguroService } from './productos_seguro.service';
import { CreateProductoSeguroDto } from './dto/create-producto-seguro.dto';
import { UpdateProductoSeguroDto } from './dto/update-producto-seguro.dto';

@Controller('productos-seguro')
export class ProductosSeguroController {
  constructor(
    private readonly productosSeguroService: ProductosSeguroService,
  ) {}

  @Post()
  create(@Body() createProductoSeguroDto: CreateProductoSeguroDto) {
    return this.productosSeguroService.create(createProductoSeguroDto);
  }

  @Get()
  findAll() {
    return this.productosSeguroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosSeguroService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoSeguroDto: UpdateProductoSeguroDto,
  ) {
    return this.productosSeguroService.update(id, updateProductoSeguroDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosSeguroService.remove(id);
  }
}
