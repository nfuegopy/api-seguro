/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateSeccionProductoPublicadoDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  seccion_web_id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  producto_seguro_id: number;

  @IsNumber()
  @IsOptional()
  orden?: number;
}
