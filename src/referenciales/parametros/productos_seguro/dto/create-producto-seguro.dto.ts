/* eslint-disable prettier/prettier */

import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt,
  IsPositive,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { TipoCalculo } from '../entities/producto_seguro.entity';

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

  @IsBoolean()
  @IsOptional()
  publicar_en_web?: boolean;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  aseguradora_id: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  tipo_de_seguro_id: number;

  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  @IsEnum(TipoCalculo)
  tipo_calculo?: TipoCalculo;
}
