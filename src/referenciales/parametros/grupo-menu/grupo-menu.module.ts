/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { GrupoMenuService } from './grupo-menu.service';
import { GrupoMenuController } from './grupo-menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupoMenu } from './entities/grupo-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrupoMenu])],
  controllers: [GrupoMenuController],
  providers: [GrupoMenuService],
})
export class GrupoMenuModule {}
