import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { CiudadController } from './ciudad.controller';

@Module({
  controllers: [CiudadController],
  providers: [CiudadService],
})
export class CiudadModule {}
