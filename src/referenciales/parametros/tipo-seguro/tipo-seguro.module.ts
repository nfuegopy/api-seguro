/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TipoSeguroService } from './tipo-seguro.service';
import { TipoSeguroController } from './tipo-seguro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoSeguro } from './entities/tipo-seguro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoSeguro])],
  controllers: [TipoSeguroController],
  providers: [TipoSeguroService],
})
export class TipoSeguroModule {}
