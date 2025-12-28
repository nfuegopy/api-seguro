/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamento } from './entities/departamento.entity';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamento)
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async create(
    createDepartamentoDto: CreateDepartamentoDto,
  ): Promise<Departamento> {
    const nuevoDepto = this.departamentoRepository.create(
      createDepartamentoDto,
    );
    return await this.departamentoRepository.save(nuevoDepto);
  }

  async createMasivo(
    createDeptoDtos: CreateDepartamentoDto[],
  ): Promise<Departamento[]> {
    const nuevosDeptos = this.departamentoRepository.create(createDeptoDtos);
    return await this.departamentoRepository.save(nuevosDeptos);
  }

  async findAll(nombre?: string): Promise<Departamento[]> {
    const options: FindManyOptions<Departamento> = {
      relations: ['pais'], // Trae la información del país relacionado
    };
    if (nombre) {
      options.where = { nombre: Like(`%${nombre}%`) };
    }
    return await this.departamentoRepository.find(options);
  }

  async findOne(id: number): Promise<Departamento> {
    const depto = await this.departamentoRepository.findOne({
      where: { id },
      relations: ['pais'], // Trae la información del país relacionado
    });
    if (!depto) {
      throw new NotFoundException(
        `El departamento con el ID ${id} no fue encontrado.`,
      );
    }
    return depto;
  }

  async update(
    id: number,
    updateDepartamentoDto: UpdateDepartamentoDto,
  ): Promise<Departamento> {
    const depto = await this.findOne(id);
    this.departamentoRepository.merge(depto, updateDepartamentoDto);
    return await this.departamentoRepository.save(depto);
  }

  async remove(id: number) {
    const depto = await this.findOne(id);
    await this.departamentoRepository.remove(depto);
    return { message: `El departamento con el ID ${id} ha sido eliminado.` };
  }
}
