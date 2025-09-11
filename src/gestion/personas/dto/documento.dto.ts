/* eslint-disable prettier/prettier */

import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class DocumentoDto {
  @IsNumber()
  @IsNotEmpty()
  tipo_documento_id: number;

  @IsString()
  @IsNotEmpty()
  numero: string;

  @IsDateString()
  @IsOptional()
  fecha_vencimiento?: Date;
}
