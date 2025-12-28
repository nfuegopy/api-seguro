/* eslint-disable prettier/prettier */

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePersonaDto } from '../../personas/dto/create-persona.dto';

export class CreateUsuarioDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @IsNumber()
  @IsNotEmpty()
  rol_id: number;

  @IsNumber()
  @IsOptional()
  @ValidateIf((o: CreateUsuarioDto) => !o.persona)
  persona_id?: number;

  @IsOptional()
  @ValidateIf((o: CreateUsuarioDto) => !o.persona_id)
  @ValidateNested()
  @Type(() => CreatePersonaDto)
  persona?: CreatePersonaDto;
}
