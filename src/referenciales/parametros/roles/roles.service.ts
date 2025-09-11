/* eslint-disable prettier/prettier */
// src/referenciales/parametros/roles/roles.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
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
}
