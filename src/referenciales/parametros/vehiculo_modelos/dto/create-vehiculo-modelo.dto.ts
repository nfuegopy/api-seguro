/* eslint-disable prettier/prettier */

import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsInt,
  IsPositive,
} from 'class-validator';

export class CreateVehiculoModeloDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nombre: string;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  marca_id: number;
}
