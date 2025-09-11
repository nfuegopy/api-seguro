import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonaDocumentosService } from './persona-documentos.service';
import { CreatePersonaDocumentoDto } from './dto/create-persona-documento.dto';
import { UpdatePersonaDocumentoDto } from './dto/update-persona-documento.dto';

@Controller('persona-documentos')
export class PersonaDocumentosController {
  constructor(private readonly personaDocumentosService: PersonaDocumentosService) {}

  @Post()
  create(@Body() createPersonaDocumentoDto: CreatePersonaDocumentoDto) {
    return this.personaDocumentosService.create(createPersonaDocumentoDto);
  }

  @Get()
  findAll() {
    return this.personaDocumentosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personaDocumentosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonaDocumentoDto: UpdatePersonaDocumentoDto) {
    return this.personaDocumentosService.update(+id, updatePersonaDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personaDocumentosService.remove(+id);
  }
}
