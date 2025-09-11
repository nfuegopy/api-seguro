/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { PersonaDocumento } from '../persona-documentos/entities/persona-documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Persona, PersonaDocumento])],
  controllers: [PersonasController],
  providers: [PersonasService],
  exports: [PersonasService],
})
export class PersonasModule {}
