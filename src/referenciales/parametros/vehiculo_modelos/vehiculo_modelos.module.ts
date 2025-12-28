/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoModelosController } from './vehiculo_modelos.controller';
import { VehiculoModelosService } from './vehiculo_modelos.service';
import { VehiculoModelo } from './entities/vehiculo_modelo.entity';
import { VehiculoMarca } from '../vehiculo_marcas/entities/vehiculo_marca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculoModelo, VehiculoMarca])],
  controllers: [VehiculoModelosController],
  providers: [VehiculoModelosService],
})
export class VehiculoModelosModule {}
