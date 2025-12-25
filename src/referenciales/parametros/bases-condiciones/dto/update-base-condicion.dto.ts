/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseCondicionDto } from './create-base-condicion.dto';

export class UpdateBaseCondicionDto extends PartialType(
  CreateBaseCondicionDto,
) {}
