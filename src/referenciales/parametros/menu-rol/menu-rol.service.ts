/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMenuRolDto } from './dto/create-menu-rol.dto';
import { UpdateMenuRolDto } from './dto/update-menu-rol.dto';
import { MenuRol } from './entities/menu-rol.entity';
import { Menu } from '../menu/entities/menu.entity';
import { Role } from '../roles/entities/role.entity';

@Injectable()
export class MenuRolService {
  constructor(
    @InjectRepository(MenuRol)
    private readonly menuRolRepository: Repository<MenuRol>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    @InjectRepository(Role)
    private readonly rolRepository: Repository<Role>,
  ) {}

  async create(createMenuRolDto: CreateMenuRolDto): Promise<MenuRol> {
    await this.validarRelaciones(
      createMenuRolDto.menu_id,
      createMenuRolDto.rol_id,
    );
    const nuevoPermiso = this.menuRolRepository.create(createMenuRolDto);
    return this.menuRolRepository.save(nuevoPermiso);
  }

  findAll() {
    return this.menuRolRepository.find({ relations: ['menu', 'rol'] });
  }

  async findOne(id: number) {
    const permiso = await this.menuRolRepository.findOne({
      where: { id },
      relations: ['menu', 'rol'],
    });
    if (!permiso) {
      throw new NotFoundException(
        `El permiso con el ID ${id} no fue encontrado.`,
      );
    }
    return permiso;
  }

  async update(
    id: number,
    updateMenuRolDto: UpdateMenuRolDto,
  ): Promise<MenuRol> {
    const permiso = await this.findOne(id);
    const menuId = updateMenuRolDto.menu_id ?? permiso.menu_id;
    const rolId = updateMenuRolDto.rol_id ?? permiso.rol_id;
    await this.validarRelaciones(menuId, rolId);

    this.menuRolRepository.merge(permiso, updateMenuRolDto);
    return this.menuRolRepository.save(permiso);
  }

  async remove(id: number) {
    const permiso = await this.findOne(id);
    await this.menuRolRepository.remove(permiso);
    return { message: `El permiso con el ID ${id} ha sido eliminado.` };
  }

  private async validarRelaciones(menuId: number, rolId: number) {
    const menu = await this.menuRepository.findOneBy({ id: menuId });
    if (!menu) {
      throw new NotFoundException(`El menú con ID ${menuId} no existe.`);
    }
    const rol = await this.rolRepository.findOneBy({ id: rolId });
    if (!rol) {
      throw new NotFoundException(`El rol con ID ${rolId} no existe.`);
    }
  }
}
