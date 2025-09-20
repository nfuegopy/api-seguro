/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoMenuDto } from './create-grupo-menu.dto';

export class UpdateGrupoMenuDto extends PartialType(CreateGrupoMenuDto) {}
