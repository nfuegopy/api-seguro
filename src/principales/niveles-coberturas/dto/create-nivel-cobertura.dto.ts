/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateNivelCoberturaDto {
  @IsNumber()
  @IsNotEmpty()
  producto_seguro_id: number;

  @IsString()
  @IsNotEmpty()
  nombre_nivel: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  prima_anual_base: number;
}