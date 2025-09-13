/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateVehiculoMarcaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;
}