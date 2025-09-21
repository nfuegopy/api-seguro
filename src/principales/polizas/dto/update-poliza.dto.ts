/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreatePolizaDto } from './create-poliza.dto';

export class UpdatePolizaDto extends PartialType(CreatePolizaDto) {}