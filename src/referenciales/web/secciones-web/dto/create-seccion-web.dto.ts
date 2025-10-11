/* eslint-disable prettier/prettier */

import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateSeccionWebDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @Transform(({ value }) => parseInt(value, 10)) // <--- AÑADIR ESTA LÍNEA
  @IsNumber()
  @IsOptional()
  orden?: number;

  @Transform(({ value }) => value === 'true' || value === '1') // <--- AÑADIR ESTA LÍNEA
  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUrl()
  @IsOptional()
  enlace_url?: string;

  @IsString()
  @IsOptional()
  texto_boton?: string;
}
