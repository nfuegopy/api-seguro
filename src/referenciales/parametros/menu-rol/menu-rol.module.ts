/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { MenuRolService } from './menu-rol.service';
import { MenuRolController } from './menu-rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRol } from './entities/menu-rol.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuRol, Menu, Role])], // Importa todas las entidades necesarias
  controllers: [MenuRolController],
  providers: [MenuRolService],
})
export class MenuRolModule {}
