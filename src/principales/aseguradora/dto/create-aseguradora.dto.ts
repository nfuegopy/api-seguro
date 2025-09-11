/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateAseguradoraDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  nit?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  direccion?: string;
}
