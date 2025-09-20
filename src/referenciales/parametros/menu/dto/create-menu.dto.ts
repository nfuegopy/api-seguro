/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsNumber()
  @IsNotEmpty()
  grupo_menu_id: number; // Por ejemplo, aquí iría el id 1 para "Administración"

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  icono?: string;
}
