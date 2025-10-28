/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { CamposFormularioService } from './campos-formulario.service';
import { CamposFormularioController } from './campos-formulario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampoFormulario } from './entities/campo-formulario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CampoFormulario])],
  controllers: [CamposFormularioController],
  providers: [CamposFormularioService],
})
export class CamposFormularioModule {}
