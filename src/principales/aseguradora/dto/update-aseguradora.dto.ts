/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateAseguradoraDto } from './create-aseguradora.dto';

export class UpdateAseguradoraDto extends PartialType(CreateAseguradoraDto) {}
