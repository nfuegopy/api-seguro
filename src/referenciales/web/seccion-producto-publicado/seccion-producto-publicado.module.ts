/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { SeccionProductoPublicadoService } from './seccion-producto-publicado.service';
import { SeccionProductoPublicadoController } from './seccion-producto-publicado.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeccionProductoPublicado } from './entities/seccion-producto-publicado.entity';
import { SeccionWeb } from '../secciones-web/entities/seccion-web.entity';
import { ProductoSeguro } from 'src/referenciales/parametros/productos_seguro/entities/producto_seguro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SeccionProductoPublicado,
      SeccionWeb,
      ProductoSeguro,
    ]),
  ],
  controllers: [SeccionProductoPublicadoController],
  providers: [SeccionProductoPublicadoService],
})
export class SeccionProductoPublicadoModule {}
