/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsDateString,
  IsBoolean,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { Parentesco } from '../entities/poliza-asegurado.entity';

export class CreatePolizaAseguradoDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  persona_id: number; // [cite: 443]

  @IsEnum(Parentesco)
  @IsNotEmpty()
  parentesco: Parentesco; // [cite: 444]

  @IsDateString()
  @IsNotEmpty()
  fecha_alta_cobertura: Date; // [cite: 445]

  @IsBoolean()
  @IsOptional()
  es_titular_tecnico?: boolean; // [cite: 446]
}
