/* eslint-disable prettier/prettier */

import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateMenuRolDto {
  @IsNumber()
  @IsNotEmpty()
  menu_id: number;

  @IsNumber()
  @IsNotEmpty()
  rol_id: number;

  @IsBoolean()
  @IsOptional()
  permitir_listar?: boolean;

  @IsBoolean()
  @IsOptional()
  permitir_guardar?: boolean;

  @IsBoolean()
  @IsOptional()
  permitir_editar?: boolean;

  @IsBoolean()
  @IsOptional()
  permitir_eliminar?: boolean;
}
