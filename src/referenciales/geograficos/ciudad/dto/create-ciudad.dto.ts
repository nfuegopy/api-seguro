/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCiudadDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  departamento_id: number;
}
