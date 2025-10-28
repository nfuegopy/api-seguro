/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateSeccionProductoPublicadoDto } from './create-seccion-producto-publicado.dto';

export class UpdateSeccionProductoPublicadoDto extends PartialType(
  CreateSeccionProductoPublicadoDto,
) {}
