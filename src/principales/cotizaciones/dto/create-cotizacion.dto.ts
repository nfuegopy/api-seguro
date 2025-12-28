/* eslint-disable prettier/prettier */

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCotizacionDto {
  @IsNotEmpty()
  @IsNumber()
  producto_seguro_id: number;

  @IsNotEmpty()
  @IsNumber()
  nivel_cobertura_id: number;

  @IsNotEmpty()
  @IsEmail()
  email_usuario: string;

  @IsOptional()
  @IsString()
  nombre_usuario?: string;

  @IsOptional()
  @IsString()
  apellido_usuario?: string;

  @IsNotEmpty()
  @IsObject()
  datos_vehiculo: Record<string, any>; // Recibe JSON flexible: { marca_id: 1, anio: 2020 ... }
}
