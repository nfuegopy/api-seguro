/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsPositive,
  IsInt,
} from 'class-validator';
import { UsoVehiculo } from '../entities/detalles-poliza-auto.entity';

export class CreateDetallesPolizaAutoDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  vehiculo_modelo_id: number; // [cite: 310]

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  anio: number; // [cite: 311]

  @IsString()
  @IsNotEmpty()
  matricula: string; // [cite: 312]

  @IsString()
  @IsNotEmpty()
  numero_chasis_vin: string; // [cite: 313]

  @IsEnum(UsoVehiculo)
  @IsNotEmpty()
  uso_vehiculo: UsoVehiculo; // [cite: 314]
}
