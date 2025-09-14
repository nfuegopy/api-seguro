/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './entities/menu.entity';
import { GrupoMenu } from '../grupo-menu/entities/grupo-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menu, GrupoMenu])], // Importar ambas entidades
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
