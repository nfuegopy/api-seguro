import { Module } from '@nestjs/common';
import { PersonaDocumentosService } from './persona-documentos.service';
import { PersonaDocumentosController } from './persona-documentos.controller';

@Module({
  controllers: [PersonaDocumentosController],
  providers: [PersonaDocumentosService],
})
export class PersonaDocumentosModule {}
