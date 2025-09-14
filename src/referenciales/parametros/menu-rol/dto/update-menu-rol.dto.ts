/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuRolDto } from './create-menu-rol.dto';

export class UpdateMenuRolDto extends PartialType(CreateMenuRolDto) {}
