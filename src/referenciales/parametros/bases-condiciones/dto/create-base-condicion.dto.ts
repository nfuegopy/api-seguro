/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsOptional, IsNumber, IsDateString } from 'class-validator';

export class CreateBaseCondicionDto {
  @IsNumber()
  @IsNotEmpty()
  producto_seguro_id: number;

  @IsString()
  @IsNotEmpty()
  contenido: string;

  @IsString()
  @IsOptional()
  version?: string;

  @IsDateString()
  @IsNotEmpty()
  fecha_publicacion: Date;
}