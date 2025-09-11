/* eslint-disable prettier/prettier */

import { IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { DocumentoDto } from './documento.dto';

export class UpdateDocumentoDto extends PartialType(DocumentoDto) {
  @IsNumber()
  @IsOptional()
  id?: number;
}
