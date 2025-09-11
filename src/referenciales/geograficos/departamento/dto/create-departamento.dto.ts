/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDepartamentoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @IsNotEmpty()
  pais_id: number;
}
