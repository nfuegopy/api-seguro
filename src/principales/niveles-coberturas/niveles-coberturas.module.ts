/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelesCoberturaService } from './niveles-coberturas.service';
import { NivelesCoberturasController } from './niveles-coberturas.controller';
import { NivelCobertura } from './entities/nivel-cobertura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NivelCobertura])],
  controllers: [NivelesCoberturasController],
  providers: [NivelesCoberturaService],
})
export class NivelesCoberturasModule {}