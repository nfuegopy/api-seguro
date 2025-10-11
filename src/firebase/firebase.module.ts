/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // Importamos ConfigModule para que el servicio pueda usar ConfigService
  providers: [FirebaseService],
  exports: [FirebaseService],
})
export class FirebaseModule {}
