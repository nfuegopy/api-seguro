/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { NivelCobertura } from './entities/nivel-cobertura.entity';
import { CreateNivelCoberturaDto } from './dto/create-nivel-cobertura.dto';
import { UpdateNivelCoberturaDto } from './dto/update-nivel-cobertura.dto';

@Injectable()
export class NivelesCoberturaService {
  constructor(
    @InjectRepository(NivelCobertura)
    private readonly nivelCoberturaRepository: Repository<NivelCobertura>,
  ) {}

  async create(dto: CreateNivelCoberturaDto) {
    const nuevo = this.nivelCoberturaRepository.create(dto);
    return this.nivelCoberturaRepository.save(nuevo);
  }

  async createMasivo(dtos: CreateNivelCoberturaDto[]) {
    const nuevos = this.nivelCoberturaRepository.create(dtos);
    return this.nivelCoberturaRepository.save(nuevos);
  }

  async findAll(nombre?: string) {
    const where = nombre ? { nombre_nivel: Like(`%${nombre}%`) } : {};
    return this.nivelCoberturaRepository.find({ where });
  }

  async findOne(id: number) {
    const nivel = await this.nivelCoberturaRepository.findOne({ where: { id } });
    if (!nivel) {
      throw new NotFoundException(`Nivel de cobertura con ID ${id} no encontrado`);
    }
    return nivel;
  }

  async update(id: number, dto: UpdateNivelCoberturaDto) {
    const nivel = await this.findOne(id);
    Object.assign(nivel, dto);
    return this.nivelCoberturaRepository.save(nivel);
  }

  async remove(id: number) {
    const nivel = await this.findOne(id);
    return this.nivelCoberturaRepository.remove(nivel);
  }
}