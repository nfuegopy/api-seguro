/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { PersonasModule } from '../personas/personas.module';
import { PersonaDocumento } from '../persona-documentos/entities/persona-documento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, PersonaDocumento]),
    PersonasModule,
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService],
})
export class UsuariosModule {}
