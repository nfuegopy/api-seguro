/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateNivelCoberturaDto } from './create-nivel-cobertura.dto';

export class UpdateNivelCoberturaDto extends PartialType(
  CreateNivelCoberturaDto,
) {}
