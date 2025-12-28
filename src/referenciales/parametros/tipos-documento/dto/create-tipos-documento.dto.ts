/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTipoDocumentoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  codigo: string;
}
