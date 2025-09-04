import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaisService } from './pais.service';
import { CreatePaiDto } from './dto/create-pai.dto';
import { UpdatePaiDto } from './dto/update-pai.dto';

@Controller('pais')
export class PaisController {
  constructor(private readonly paisService: PaisService) {}

  @Post()
  create(@Body() createPaiDto: CreatePaiDto) {
    return this.paisService.create(createPaiDto);
  }

  @Get()
  findAll() {
    return this.paisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaiDto: UpdatePaiDto) {
    return this.paisService.update(+id, updatePaiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paisService.remove(+id);
  }
}
