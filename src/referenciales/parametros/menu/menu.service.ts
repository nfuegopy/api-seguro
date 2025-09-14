/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
import { GrupoMenu } from '../grupo-menu/entities/grupo-menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(GrupoMenu) // Necesario para validar que el grupo existe
    private readonly grupoMenuRepository: Repository<GrupoMenu>,
  ) {}

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const grupo = await this.grupoMenuRepository.findOne({
      where: { id: createMenuDto.grupo_menu_id },
    });
    if (!grupo) {
      throw new NotFoundException(
        `El grupo de menú con ID ${createMenuDto.grupo_menu_id} no existe.`,
      );
    }
    const nuevoMenu = this.menuRepository.create(createMenuDto);
    return this.menuRepository.save(nuevoMenu);
  }

  findAll() {
    return this.menuRepository.find({ relations: ['grupoMenu'] });
  }

  async findOne(id: number) {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['grupoMenu'],
    });
    if (!menu) {
      throw new NotFoundException(
        `La opción de menú con el ID ${id} no fue encontrada.`,
      );
    }
    return menu;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    if (updateMenuDto.grupo_menu_id) {
      const grupo = await this.grupoMenuRepository.findOne({
        where: { id: updateMenuDto.grupo_menu_id },
      });
      if (!grupo) {
        throw new NotFoundException(
          `El grupo de menú con ID ${updateMenuDto.grupo_menu_id} no existe.`,
        );
      }
    }
    const menu = await this.findOne(id);
    this.menuRepository.merge(menu, updateMenuDto);
    return this.menuRepository.save(menu);
  }

  async remove(id: number) {
    const menu = await this.findOne(id);
    await this.menuRepository.remove(menu);
    return { message: `La opción de menú con el ID ${id} ha sido eliminada.` };
  }
}
