/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosSeguroController } from './productos_seguro.controller';
import { ProductosSeguroService } from './productos_seguro.service';
import { ProductoSeguro } from './entities/producto_seguro.entity';
import { Aseguradora } from '../../../principales/aseguradora/entities/aseguradora.entity';
import { TipoSeguro } from '../../parametros/tipo-seguro/entities/tipo-seguro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductoSeguro, Aseguradora, TipoSeguro]),
  ],
  controllers: [ProductosSeguroController],
  providers: [ProductosSeguroService],
})
export class ProductosSeguroModule {}
