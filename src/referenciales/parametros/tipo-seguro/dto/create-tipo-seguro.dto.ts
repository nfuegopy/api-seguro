/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTipoSeguroDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
