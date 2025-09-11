/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreatePaisDto } from './create-pais.dto';

// PartialType(CreatePaisDto) crea una nueva clase con las mismas propiedades
// que CreatePaisDto, pero todas opcionales.
// Esto nos permite enviar solo el campo que queremos actualizar.
export class UpdatePaisDto extends PartialType(CreatePaisDto) {}
