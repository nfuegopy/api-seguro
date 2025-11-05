/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateCampoFormularioDto } from './create-campo-formulario.dto';

export class UpdateCampoFormularioDto extends PartialType(
  CreateCampoFormularioDto,
) {}
