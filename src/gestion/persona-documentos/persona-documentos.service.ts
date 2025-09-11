import { Injectable } from '@nestjs/common';
import { CreatePersonaDocumentoDto } from './dto/create-persona-documento.dto';
import { UpdatePersonaDocumentoDto } from './dto/update-persona-documento.dto';

@Injectable()
export class PersonaDocumentosService {
  create(createPersonaDocumentoDto: CreatePersonaDocumentoDto) {
    return 'This action adds a new personaDocumento';
  }

  findAll() {
    return `This action returns all personaDocumentos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personaDocumento`;
  }

  update(id: number, updatePersonaDocumentoDto: UpdatePersonaDocumentoDto) {
    return `This action updates a #${id} personaDocumento`;
  }

  remove(id: number) {
    return `This action removes a #${id} personaDocumento`;
  }
}
