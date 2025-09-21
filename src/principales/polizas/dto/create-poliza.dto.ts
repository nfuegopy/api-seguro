/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber, IsDateString, IsEnum, IsOptional } from 'class-validator';
import { EstadoPoliza } from '../entities/poliza.entity';

export class CreatePolizaDto {
  @IsString()
  @IsNotEmpty()
  numero_poliza: string;

  @IsNumber()
  @IsNotEmpty()
  usuario_id: number;

  @IsNumber()
  @IsNotEmpty()
  producto_seguro_id: number;

  @IsNumber()
  @IsNotEmpty()
  nivel_cobertura_id: number;

  @IsDateString()
  @IsNotEmpty()
  fecha_emision: Date;

  @IsDateString()
  @IsNotEmpty()
  fecha_inicio_vigencia: Date;

  @IsDateString()
  @IsNotEmpty()
  fecha_fin_vigencia: Date;

  @IsNumber()
  @IsNotEmpty()
  prima_total: number;

  @IsEnum(EstadoPoliza)
  @IsOptional()
  estado?: EstadoPoliza;
}