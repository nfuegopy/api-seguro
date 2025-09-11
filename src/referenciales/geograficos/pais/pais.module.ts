/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { PaisService } from './pais.service';
import { PaisController } from './pais.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from './entities/pais.entity';

@Module({
  // Aquí registramos la entidad 'Pais' para que esté disponible en este módulo.
  imports: [TypeOrmModule.forFeature([Pais])],
  controllers: [PaisController],
  providers: [PaisService],
})
export class PaisModule {}
