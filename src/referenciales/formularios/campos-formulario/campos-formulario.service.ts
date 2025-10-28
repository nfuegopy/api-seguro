/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampoFormulario } from './entities/campo-formulario.entity';
import { CreateCampoFormularioDto } from './dto/create-campo-formulario.dto';
import { UpdateCampoFormularioDto } from './dto/update-campo-formulario.dto';

@Injectable()
export class CamposFormularioService {
  constructor(
    @InjectRepository(CampoFormulario)
    private readonly repo: Repository<CampoFormulario>,
  ) {}

  async create(dto: CreateCampoFormularioDto): Promise<CampoFormulario> {
    const nuevo = this.repo.create(dto);
    return this.repo.save(nuevo);
  }

  findAll(): Promise<CampoFormulario[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<CampoFormulario> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(
        `El campo de formulario con ID ${id} no fue encontrado.`,
      );
    }
    return item;
  }

  async update(
    id: number,
    dto: UpdateCampoFormularioDto,
  ): Promise<CampoFormulario> {
    const item = await this.findOne(id);
    this.repo.merge(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { message: `El campo con ID ${id} ha sido eliminado.` };
  }
}
