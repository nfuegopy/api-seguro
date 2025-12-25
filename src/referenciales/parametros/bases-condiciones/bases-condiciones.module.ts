/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasesCondicionesService } from './bases-condiciones.service';
import { BasesCondicionesController } from './bases-condiciones.controller';
import { BaseCondicion } from './entities/bases-condiciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BaseCondicion])],
  controllers: [BasesCondicionesController],
  providers: [BasesCondicionesService],
})
export class BasesCondicionesModule {}
