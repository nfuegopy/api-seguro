/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
  IsOptional,
  ValidateNested, // <-- AÑADIR
  IsArray, // <-- AÑADIR
  ArrayMinSize, // <-- AÑADIR
} from 'class-validator';
import { Type } from 'class-transformer'; // <-- AÑADIR
import { EstadoPoliza } from '../entities/poliza.entity';

// --- AÑADIR IMPORTS DE NUEVOS DTOS ---
import { CreatePolizaAseguradoDto } from './create-poliza-asegurado.dto';
import { CreateDetallesPolizaAutoDto } from './create-detalles-poliza-auto.dto';
import { CreateDetallesPolizaMedicaDto } from './create-detalles-poliza-medica.dto';

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

  // --- AÑADIR NUEVOS CAMPOS ANIDADOS ---

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePolizaAseguradoDto)
  asegurados: CreatePolizaAseguradoDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateDetallesPolizaAutoDto)
  detalles_auto?: CreateDetallesPolizaAutoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateDetallesPolizaMedicaDto)
  detalles_medico?: CreateDetallesPolizaMedicaDto;
}
