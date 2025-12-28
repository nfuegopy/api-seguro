/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoMarcasController } from './vehiculo_marcas.controller';
import { VehiculoMarcasService } from './vehiculo_marcas.service';
import { VehiculoMarca } from './entities/vehiculo_marca.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculoMarca])],
  controllers: [VehiculoMarcasController],
  providers: [VehiculoMarcasService],
})
export class VehiculoMarcasModule {}
