/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoDocumentoDto } from './create-tipos-documento.dto';

export class UpdateTipoDocumentoDto extends PartialType(
  CreateTipoDocumentoDto,
) {}
