/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { MenuRol } from '../menu-rol/entities/menu-rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, MenuRol])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
