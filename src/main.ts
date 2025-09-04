/* eslint-disable prettier/prettier */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- Importa

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Añade esta línea para habilitar las validaciones globales
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
