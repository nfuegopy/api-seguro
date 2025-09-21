/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Poliza } from './entities/poliza.entity';
import { CreatePolizaDto } from './dto/create-poliza.dto';
import { UpdatePolizaDto } from './dto/update-poliza.dto';

@Injectable()
export class PolizasService {
  constructor(
    @InjectRepository(Poliza)
    private readonly polizaRepository: Repository<Poliza>,
  ) {}

  create(createPolizaDto: CreatePolizaDto) {
    const nueva = this.polizaRepository.create(createPolizaDto);
    return this.polizaRepository.save(nueva);
  }

  createMasivo(dtos: CreatePolizaDto[]) {
    const nuevas = this.polizaRepository.create(dtos);
    return this.polizaRepository.save(nuevas);
  }

  findAll() {
    return this.polizaRepository.find();
  }

  async findOne(id: number) {
    const poliza = await this.polizaRepository.findOne({ where: { id } });
    if (!poliza) {
      throw new NotFoundException(`Póliza con ID ${id} no encontrada`);
    }
    return poliza;
  }

  async update(id: number, updatePolizaDto: UpdatePolizaDto) {
    const poliza = await this.findOne(id);
    Object.assign(poliza, updatePolizaDto);
    return this.polizaRepository.save(poliza);
  }

  async remove(id: number) {
    const poliza = await this.findOne(id);
    return this.polizaRepository.remove(poliza);
  }
}