/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Aseguradora } from './entities/aseguradora.entity';
import { CreateAseguradoraDto } from './dto/create-aseguradora.dto';
import { UpdateAseguradoraDto } from './dto/update-aseguradora.dto';

@Injectable()
export class AseguradoraService {
  constructor(
    @InjectRepository(Aseguradora)
    private readonly aseguradoraRepository: Repository<Aseguradora>,
  ) {}

  async create(dto: CreateAseguradoraDto) {
    const nueva = this.aseguradoraRepository.create(dto);
    return this.aseguradoraRepository.save(nueva);
  }

  async createMasivo(dtos: CreateAseguradoraDto[]) {
    const nuevas = this.aseguradoraRepository.create(dtos);
    return this.aseguradoraRepository.save(nuevas);
  }

  async findAll(nombre?: string) {
    const where = nombre ? { nombre: Like(`%${nombre}%`) } : {};
    return this.aseguradoraRepository.find({ where });
  }

  async findOne(id: number) {
    const aseguradora = await this.aseguradoraRepository.findOne({ where: { id } });
    if (!aseguradora) {
      throw new NotFoundException(`Aseguradora con ID ${id} no encontrada`);
    }
    return aseguradora;
  }

  async update(id: number, dto: UpdateAseguradoraDto) {
    const aseguradora = await this.findOne(id);
    Object.assign(aseguradora, dto);
    return this.aseguradoraRepository.save(aseguradora);
  }

  async remove(id: number) {
    const aseguradora = await this.findOne(id);
    return this.aseguradoraRepository.remove(aseguradora);
  }
}
