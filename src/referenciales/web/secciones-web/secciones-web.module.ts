/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { SeccionesWebService } from './secciones-web.service';
import { SeccionesWebController } from './secciones-web.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeccionWeb } from './entities/seccion-web.entity'; // <-- Importar la entidad
import { FirebaseModule } from 'src/firebase/firebase.module'; // <-- Importar el módulo de Firebase

@Module({
  imports: [
    TypeOrmModule.forFeature([SeccionWeb]), // <-- Registrar la entidad
    FirebaseModule, // <-- Hacer disponible el FirebaseService
  ],
  controllers: [SeccionesWebController],
  providers: [SeccionesWebService],
})
export class SeccionesWebModule {}
