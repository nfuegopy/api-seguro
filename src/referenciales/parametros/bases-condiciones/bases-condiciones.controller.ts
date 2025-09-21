/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasesCondicionesService } from './bases-condiciones.service';
import { CreateBaseCondicionDto } from './dto/create-base-condicion.dto';
import { UpdateBaseCondicionDto } from './dto/update-base-condicion.dto';

@Controller('bases-condiciones')
export class BasesCondicionesController {
  constructor(private readonly basesCondicionesService: BasesCondicionesService) {}

  @Post()
  create(@Body() createBaseCondicioneDto: CreateBaseCondicionDto) {
    return this.basesCondicionesService.create(createBaseCondicioneDto);
  }

 @Post('masivo')
 createMasivo(@Body() dtos: CreateBaseCondicionDto[]) {
    return this.basesCondicionesService.createMasivo(dtos);
 }

  @Get()
  findAll() {
    return this.basesCondicionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basesCondicionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseCondicioneDto: UpdateBaseCondicionDto) {
    return this.basesCondicionesService.update(+id, updateBaseCondicioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basesCondicionesService.remove(+id);
  }
}