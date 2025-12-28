/* eslint-disable prettier/prettier */
// src/referenciales/parametros/roles/roles.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { MenuRol } from '../menu-rol/entities/menu-rol.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(MenuRol) // <-- 2. Inyectar el repositorio de MenuRol
    private readonly menuRolRepository: Repository<MenuRol>,
  ) {}

  // CREAR un nuevo rol
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const nuevoRol = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(nuevoRol);
  }

  // OBTENER todos los roles
  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find();
  }

  // OBTENER un rol por su ID
  async findOne(id: number): Promise<Role> {
    const rol = await this.rolesRepository.findOne({ where: { id } });
    if (!rol) {
      throw new NotFoundException(`El rol con el ID ${id} no fue encontrado.`);
    }
    return rol;
  }

  // ACTUALIZAR un rol por su ID
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const rol = await this.findOne(id);
    this.rolesRepository.merge(rol, updateRoleDto);
    return await this.rolesRepository.save(rol);
  }

  // ELIMINAR un rol por su ID
  async remove(id: number) {
    const rol = await this.findOne(id);
    await this.rolesRepository.remove(rol);
    return { message: `El rol con el ID ${id} ha sido eliminado.` };
  }

  async findMenuByRol(id: number): Promise<any> {
    // Primero, verificamos que el rol exista
    await this.findOne(id);

    // Buscamos todos los permisos de menú para ese rol
    const permisos = await this.menuRolRepository.find({
      where: { rol_id: id },
      relations: ['menu', 'menu.grupoMenu'], // <-- Carga anidada: el menú y el grupo del menú
    });

    // Transformamos los datos para que sean más fáciles de usar en el frontend
    const menuPorGrupo = {};

    permisos.forEach((permiso) => {
      const grupo = permiso.menu.grupoMenu;
      const menu = permiso.menu;

      if (!grupo) return; // Si un menú no tiene grupo, lo omitimos

      if (!menuPorGrupo[grupo.id]) {
        menuPorGrupo[grupo.id] = {
          id: grupo.id,
          nombre: grupo.nombre,
          icono: grupo.icono,
          opciones: [],
        };
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      menuPorGrupo[grupo.id].opciones.push({
        id: menu.id,
        nombre: menu.nombre,
        url: menu.url,
        icono: menu.icono,
        permisos: {
          listar: permiso.permitir_listar,
          guardar: permiso.permitir_guardar,
          editar: permiso.permitir_editar,
          eliminar: permiso.permitir_eliminar,
        },
      });
    });

    // Convertimos el objeto en un array para la respuesta final
    return Object.values(menuPorGrupo);
  }
}
