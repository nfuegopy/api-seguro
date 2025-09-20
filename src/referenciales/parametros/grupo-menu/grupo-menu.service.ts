/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGrupoMenuDto } from './dto/create-grupo-menu.dto';
import { UpdateGrupoMenuDto } from './dto/update-grupo-menu.dto';
import { GrupoMenu } from './entities/grupo-menu.entity';

@Injectable()
export class GrupoMenuService {
  constructor(
    @InjectRepository(GrupoMenu)
    private readonly grupoMenuRepository: Repository<GrupoMenu>,
  ) {}

  create(createGrupoMenuDto: CreateGrupoMenuDto) {
    const nuevoGrupo = this.grupoMenuRepository.create(createGrupoMenuDto);
    return this.grupoMenuRepository.save(nuevoGrupo);
  }

  findAll() {
    return this.grupoMenuRepository.find();
  }

  async findOne(id: number) {
    const grupoMenu = await this.grupoMenuRepository.findOne({ where: { id } });
    if (!grupoMenu) {
      throw new NotFoundException(
        `El grupo de menú con el ID ${id} no fue encontrado.`,
      );
    }
    return grupoMenu;
  }

  async update(id: number, updateGrupoMenuDto: UpdateGrupoMenuDto) {
    const grupoMenu = await this.findOne(id);
    this.grupoMenuRepository.merge(grupoMenu, updateGrupoMenuDto);
    return this.grupoMenuRepository.save(grupoMenu);
  }

  async remove(id: number) {
    const grupoMenu = await this.findOne(id);
    await this.grupoMenuRepository.remove(grupoMenu);
    return { message: `El grupo de menú con el ID ${id} ha sido eliminado.` };
  }
}
