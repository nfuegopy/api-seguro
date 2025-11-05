/* eslint-disable prettier/prettier */

import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { TipoHtml } from '../enum/tipo-html.enum';

export class CreateCampoFormularioDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  entidad_destino: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  key_tecnica: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  etiqueta: string;

  @IsEnum(TipoHtml)
  @IsNotEmpty()
  tipo_html: TipoHtml;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  placeholder?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  api_endpoint_options?: string;
}
