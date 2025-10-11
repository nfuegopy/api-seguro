/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import { CreateSeccionWebDto } from './create-seccion-web.dto';

export class UpdateSeccionWebDto extends PartialType(CreateSeccionWebDto) {}
