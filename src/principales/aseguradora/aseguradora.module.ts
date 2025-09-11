/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AseguradoraService } from './aseguradora.service';
import { AseguradoraController } from './aseguradora.controller';
import { Aseguradora } from './entities/aseguradora.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aseguradora])],
  controllers: [AseguradoraController],
  providers: [AseguradoraService],
})
export class AseguradoraModule {}
