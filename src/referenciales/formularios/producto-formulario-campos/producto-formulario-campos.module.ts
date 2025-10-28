/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ProductoFormularioCamposService } from './producto-formulario-campos.service';
import { ProductoFormularioCamposController } from './producto-formulario-campos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoFormularioCampo } from './entities/producto-formulario-campo.entity';
import { ProductoSeguro } from 'src/referenciales/parametros/productos_seguro/entities/producto_seguro.entity';
import { CampoFormulario } from '../campos-formulario/entities/campo-formulario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductoFormularioCampo,
      ProductoSeguro,
      CampoFormulario,
    ]),
  ],
  controllers: [ProductoFormularioCamposController],
  providers: [ProductoFormularioCamposService],
})
export class ProductoFormularioCamposModule {}
