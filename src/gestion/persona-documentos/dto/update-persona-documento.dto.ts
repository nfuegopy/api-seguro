import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaDocumentoDto } from './create-persona-documento.dto';

export class UpdatePersonaDocumentoDto extends PartialType(CreatePersonaDocumentoDto) {}
