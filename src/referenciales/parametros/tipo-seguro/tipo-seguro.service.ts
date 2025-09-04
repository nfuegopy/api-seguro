/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoSeguroDto } from './dto/create-tipo-seguro.dto';
import { UpdateTipoSeguroDto } from './dto/update-tipo-seguro.dto';
import { TipoSeguro } from './entities/tipo-seguro.entity';

@Injectable()
export class TipoSeguroService {
  constructor(
    @InjectRepository(TipoSeguro)
    private readonly tipoSeguroRepository: Repository<TipoSeguro>,
  ) {}

  async create(createTipoSeguroDto: CreateTipoSeguroDto): Promise<TipoSeguro> {
    const nuevoTipo = this.tipoSeguroRepository.create(createTipoSeguroDto);
    return await this.tipoSeguroRepository.save(nuevoTipo);
  }

  async findAll(): Promise<TipoSeguro[]> {
    return await this.tipoSeguroRepository.find();
  }

  async findOne(id: number): Promise<TipoSeguro> {
    const tipoSeguro = await this.tipoSeguroRepository.findOne({
      where: { id },
    });
    if (!tipoSeguro) {
      throw new NotFoundException(
        `El tipo de seguro con el ID ${id} no fue encontrado.`,
      );
    }
    return tipoSeguro;
  }

  async update(
    id: number,
    updateTipoSeguroDto: UpdateTipoSeguroDto,
  ): Promise<TipoSeguro> {
    const tipoSeguro = await this.findOne(id);
    this.tipoSeguroRepository.merge(tipoSeguro, updateTipoSeguroDto);
    return await this.tipoSeguroRepository.save(tipoSeguro);
  }

  async remove(id: number) {
    const tipoSeguro = await this.findOne(id);
    await this.tipoSeguroRepository.remove(tipoSeguro);
    return { message: `El tipo de seguro con el ID ${id} ha sido eliminado.` };
  }
}
