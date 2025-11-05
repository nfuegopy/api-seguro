/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoFormularioCampoDto } from './create-producto-formulario-campo.dto';

export class UpdateProductoFormularioCampoDto extends PartialType(
  CreateProductoFormularioCampoDto,
) {}
