/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseCondicion } from './entities/bases-condiciones.entity';
import { CreateBaseCondicionDto } from './dto/create-base-condicion.dto';
import { UpdateBaseCondicionDto } from './dto/update-base-condicion.dto';

@Injectable()
export class BasesCondicionesService {
  constructor(
    @InjectRepository(BaseCondicion)
    private readonly baseCondicionRepository: Repository<BaseCondicion>,
  ) {}

  create(createBaseCondicioneDto: CreateBaseCondicionDto) {
    const nueva = this.baseCondicionRepository.create(createBaseCondicioneDto);
    return this.baseCondicionRepository.save(nueva);
  }

  async createMasivo(dtos: CreateBaseCondicionDto[]) {
    const nuevos = this.baseCondicionRepository.create(dtos);
    return this.baseCondicionRepository.save(nuevos);
  }

  findAll() {
    return this.baseCondicionRepository.find();
  }

  async findOne(id: number) {
    const condicion = await this.baseCondicionRepository.findOne({ where: { id } });
    if (!condicion) {
      throw new NotFoundException(`Base o condición con ID ${id} no encontrada`);
    }
    return condicion;
  }

  async update(id: number, updateBaseCondicioneDto: UpdateBaseCondicionDto) {
    const condicion = await this.findOne(id);
    Object.assign(condicion, updateBaseCondicioneDto);
    return this.baseCondicionRepository.save(condicion);
  }

  async remove(id: number) {
    const condicion = await this.findOne(id);
    return this.baseCondicionRepository.remove(condicion);
  }
}