/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGrupoMenuDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  icono?: string;
}
