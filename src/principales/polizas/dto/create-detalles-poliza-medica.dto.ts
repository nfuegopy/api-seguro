/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsEnum,
  IsBoolean,
  IsString,
  IsOptional,
} from 'class-validator';
import { TipoPlanMedico } from '../entities/detalles-poliza-medica.entity';

export class CreateDetallesPolizaMedicaDto {
  @IsEnum(TipoPlanMedico)
  @IsNotEmpty()
  tipo_plan: TipoPlanMedico; // [cite: 332]

  @IsBoolean()
  @IsNotEmpty()
  declaracion_salud_ok: boolean; // [cite: 333]

  @IsString()
  @IsOptional()
  observaciones_salud?: string; // [cite: 334]
}
