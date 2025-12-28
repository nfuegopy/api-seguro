/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoSeguroDto } from './create-producto-seguro.dto';

export class UpdateProductoSeguroDto extends PartialType(
  CreateProductoSeguroDto,
) {}
