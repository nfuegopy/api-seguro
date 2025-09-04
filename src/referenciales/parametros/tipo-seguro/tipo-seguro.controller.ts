import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TipoSeguroService } from './tipo-seguro.service';
import { CreateTipoSeguroDto } from './dto/create-tipo-seguro.dto';
import { UpdateTipoSeguroDto } from './dto/update-tipo-seguro.dto';

@Controller('tipo-seguro')
export class TipoSeguroController {
  constructor(private readonly tipoSeguroService: TipoSeguroService) {}

  @Post()
  create(@Body() createTipoSeguroDto: CreateTipoSeguroDto) {
    return this.tipoSeguroService.create(createTipoSeguroDto);
  }

  @Get()
  findAll() {
    return this.tipoSeguroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoSeguroService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTipoSeguroDto: UpdateTipoSeguroDto) {
    return this.tipoSeguroService.update(+id, updateTipoSeguroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoSeguroService.remove(+id);
  }
}
