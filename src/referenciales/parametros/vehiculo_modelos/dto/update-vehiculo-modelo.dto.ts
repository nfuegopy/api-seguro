/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateVehiculoModeloDto } from './create-vehiculo-modelo.dto';

export class UpdateVehiculoModeloDto extends PartialType(
  CreateVehiculoModeloDto,
) {}
