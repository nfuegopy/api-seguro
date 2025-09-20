/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, MaxLength, IsInt, IsPositive, IsOptional, IsBoolean } from 'class-validator';

export class CreateProductoSeguroDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nombre_producto: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  descripcion_corta?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  aseguradora_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  tipo_de_seguro_id: number;
}