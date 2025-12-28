/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CotizacionesService } from './cotizaciones.service';
import { CotizacionesController } from './cotizaciones.controller';
import { Cotizacion } from './entities/cotizacion.entity';
import { ProductoSeguro } from '../../referenciales/parametros/productos_seguro/entities/producto_seguro.entity';
import { VehiculoMarca } from '../../referenciales/parametros/vehiculo_marcas/entities/vehiculo_marca.entity';
import { NivelCobertura } from '../niveles-coberturas/entities/nivel-cobertura.entity';
import { UsuariosModule } from '../../gestion/usuarios/usuarios.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Cotizacion,
      ProductoSeguro,
      VehiculoMarca,
      NivelCobertura,
    ]),
    UsuariosModule, // Importamos esto para usar UsuariosService
  ],
  controllers: [CotizacionesController],
  providers: [CotizacionesService],
})
export class CotizacionesModule {}
