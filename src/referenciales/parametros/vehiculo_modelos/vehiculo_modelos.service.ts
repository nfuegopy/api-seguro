/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVehiculoModeloDto } from './dto/create-vehiculo-modelo.dto';
import { UpdateVehiculoModeloDto } from './dto/update-vehiculo-modelo.dto';
import { VehiculoModelo } from './entities/vehiculo_modelo.entity';
import { VehiculoMarca } from '../vehiculo_marcas/entities/vehiculo_marca.entity';

@Injectable()
export class VehiculoModelosService {
  constructor(
    @InjectRepository(VehiculoModelo)
    private readonly modeloRepository: Repository<VehiculoModelo>,
    @InjectRepository(VehiculoMarca)
    private readonly marcaRepository: Repository<VehiculoMarca>,
  ) {}

  async create(createModeloDto: CreateVehiculoModeloDto): Promise<VehiculoModelo> {
    const marca = await this.marcaRepository.findOne({ where: { id: createModeloDto.marca_id } });
    if (!marca) {
      throw new NotFoundException(`La marca con el ID ${createModeloDto.marca_id} no fue encontrada.`);
    }
    const nuevoModelo = this.modeloRepository.create({
      nombre: createModeloDto.nombre,
      marca: marca,
    });
    return await this.modeloRepository.save(nuevoModelo);
  }

  async findAll(): Promise<VehiculoModelo[]> {
    return await this.modeloRepository.find({ relations: ['marca'] });
  }

  async findOne(id: number): Promise<VehiculoModelo> {
    const modelo = await this.modeloRepository.findOne({ where: { id }, relations: ['marca'] });
    if (!modelo) {
      throw new NotFoundException(`El modelo con el ID ${id} no fue encontrado.`);
    }
    return modelo;
  }

  async update(id: number, updateModeloDto: UpdateVehiculoModeloDto): Promise<VehiculoModelo> {
    const modelo = await this.findOne(id);
    
    if (updateModeloDto.marca_id && updateModeloDto.marca_id !== modelo.marca.id) {
        const nuevaMarca = await this.marcaRepository.findOne({ where: { id: updateModeloDto.marca_id } });
        if (!nuevaMarca) {
            throw new NotFoundException(`La marca con el ID ${updateModeloDto.marca_id} no fue encontrada.`);
        }
        modelo.marca = nuevaMarca;
    }

    // Object.assign se puede usar para fusionar las demás propiedades
    Object.assign(modelo, { nombre: updateModeloDto.nombre });
    
    return await this.modeloRepository.save(modelo);
  }

  async remove(id: number) {
    const modelo = await this.findOne(id);
    await this.modeloRepository.remove(modelo);
    return { message: `El modelo con el ID ${id} ha sido eliminado.` };
  }
}
