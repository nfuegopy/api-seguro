/* eslint-disable prettier/prettier */

import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  Min,
  IsNumber,
} from 'class-validator';

export class CreateVehiculoMarcaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  factor_riesgo?: number;
}
