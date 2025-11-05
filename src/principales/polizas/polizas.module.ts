/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolizasService } from './polizas.service';
import { PolizasController } from './polizas.controller';
import { Poliza } from './entities/poliza.entity';

// --- AÑADIR IMPORTS DE NUEVAS ENTIDADES ---
import { DetallesPolizaAuto } from './entities/detalles-poliza-auto.entity';
import { DetallesPolizaMedica } from './entities/detalles-poliza-medica.entity';
import { PolizaAsegurado } from './entities/poliza-asegurado.entity';
import { ProductoSeguro } from 'src/referenciales/parametros/productos_seguro/entities/producto_seguro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Poliza,
      // --- AÑADIR ENTIDADES AL ARRAY ---
      DetallesPolizaAuto,
      DetallesPolizaMedica,
      PolizaAsegurado,
      ProductoSeguro, // Necesario para que el servicio valide el tipo de producto
    ]),
  ],
  controllers: [PolizasController],
  providers: [PolizasService],
})
export class PolizasModule {}
