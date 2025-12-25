/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiculoMarcaDto } from './create-vehiculo-marca.dto';

export class UpdateVehiculoMarcaDto extends PartialType(
  CreateVehiculoMarcaDto,
) {}
