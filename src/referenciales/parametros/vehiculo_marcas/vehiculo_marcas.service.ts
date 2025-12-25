/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehiculoMarcaDto } from './dto/create-vehiculo-marca.dto';
import { UpdateVehiculoMarcaDto } from './dto/update-vehiculo-marca.dto';
import { VehiculoMarca } from './entities/vehiculo_marca.entity';

@Injectable()
export class VehiculoMarcasService {
  constructor(
    @InjectRepository(VehiculoMarca)
    private readonly marcaRepository: Repository<VehiculoMarca>,
  ) {}

  async create(createMarcaDto: CreateVehiculoMarcaDto): Promise<VehiculoMarca> {
    const nuevaMarca = this.marcaRepository.create(createMarcaDto);
    return await this.marcaRepository.save(nuevaMarca);
  }

  async findAll(): Promise<VehiculoMarca[]> {
    return await this.marcaRepository.find();
  }

  async findOne(id: number): Promise<VehiculoMarca> {
    const marca = await this.marcaRepository.findOne({ where: { id } });
    if (!marca) {
      throw new NotFoundException(
        `La marca con el ID ${id} no fue encontrada.`,
      );
    }
    return marca;
  }

  async update(
    id: number,
    updateMarcaDto: UpdateVehiculoMarcaDto,
  ): Promise<VehiculoMarca> {
    const marca = await this.findOne(id);
    this.marcaRepository.merge(marca, updateMarcaDto);
    return await this.marcaRepository.save(marca);
  }

  async remove(id: number) {
    const marca = await this.findOne(id);
    await this.marcaRepository.remove(marca);
    return { message: `La marca con el ID ${id} ha sido eliminada.` };
  }
}
