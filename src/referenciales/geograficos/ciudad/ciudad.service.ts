/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import { Ciudad } from './entities/ciudad.entity';

@Injectable()
export class CiudadService {
  constructor(
    @InjectRepository(Ciudad)
    private readonly ciudadRepository: Repository<Ciudad>,
  ) {}

  async create(createCiudadDto: CreateCiudadDto): Promise<Ciudad> {
    const nuevaCiudad = this.ciudadRepository.create(createCiudadDto);
    return await this.ciudadRepository.save(nuevaCiudad);
  }

  async createMasivo(createCiudadDtos: CreateCiudadDto[]): Promise<Ciudad[]> {
    const nuevasCiudades = this.ciudadRepository.create(createCiudadDtos);
    return await this.ciudadRepository.save(nuevasCiudades);
  }

  async findAll(nombre?: string): Promise<Ciudad[]> {
    const options: FindManyOptions<Ciudad> = {
      relations: ['departamento'], // Trae la información del departamento relacionado
    };
    if (nombre) {
      options.where = { nombre: Like(`%${nombre}%`) };
    }
    return await this.ciudadRepository.find(options);
  }

  async findOne(id: number): Promise<Ciudad> {
    const ciudad = await this.ciudadRepository.findOne({
      where: { id },
      relations: ['departamento'],
    });
    if (!ciudad) {
      throw new NotFoundException(
        `La ciudad con el ID ${id} no fue encontrada.`,
      );
    }
    return ciudad;
  }

  async update(id: number, updateCiudadDto: UpdateCiudadDto): Promise<Ciudad> {
    const ciudad = await this.findOne(id);
    this.ciudadRepository.merge(ciudad, updateCiudadDto);
    return await this.ciudadRepository.save(ciudad);
  }

  async remove(id: number) {
    const ciudad = await this.findOne(id);
    await this.ciudadRepository.remove(ciudad);
    return { message: `La ciudad con el ID ${id} ha sido eliminada.` };
  }
}
