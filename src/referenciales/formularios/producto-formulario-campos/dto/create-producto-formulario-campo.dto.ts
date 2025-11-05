/* eslint-disable prettier/prettier */

import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateProductoFormularioCampoDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  producto_seguro_id: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  campo_formulario_id: number;

  @IsBoolean()
  @IsOptional()
  es_requerido?: boolean;

  @IsNumber()
  @IsOptional()
  orden?: number;
}
