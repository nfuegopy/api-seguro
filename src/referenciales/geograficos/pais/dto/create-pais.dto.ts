/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaisDto {
  // @IsString() asegura que el valor recibido sea un texto.
  // @IsNotEmpty() asegura que el campo no esté vacío.
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
