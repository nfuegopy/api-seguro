import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoSeguroDto } from './create-tipo-seguro.dto';

export class UpdateTipoSeguroDto extends PartialType(CreateTipoSeguroDto) {}
