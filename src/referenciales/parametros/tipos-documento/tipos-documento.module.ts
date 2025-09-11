/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TiposDocumentoService } from './tipos-documento.service';
import { TiposDocumentoController } from './tipos-documento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoDocumento } from './entities/tipos-documento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoDocumento])],
  controllers: [TiposDocumentoController],
  providers: [TiposDocumentoService],
})
export class TiposDocumentoModule {}
