/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipoDocumentoDto } from './dto/create-tipos-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipos-documento.dto';
import { TipoDocumento } from './entities/tipos-documento.entity';

@Injectable()
export class TiposDocumentoService {
  constructor(
    @InjectRepository(TipoDocumento)
    private readonly tipoDocRepository: Repository<TipoDocumento>,
  ) {}

  async create(
    createTipoDocumentoDto: CreateTipoDocumentoDto,
  ): Promise<TipoDocumento> {
    const nuevoTipoDoc = this.tipoDocRepository.create(createTipoDocumentoDto);
    return await this.tipoDocRepository.save(nuevoTipoDoc);
  }

  async findAll(): Promise<TipoDocumento[]> {
    return await this.tipoDocRepository.find();
  }

  async findOne(id: number): Promise<TipoDocumento> {
    const tipoDoc = await this.tipoDocRepository.findOne({ where: { id } });
    if (!tipoDoc) {
      throw new NotFoundException(
        `El tipo de documento con el ID ${id} no fue encontrado.`,
      );
    }
    return tipoDoc;
  }

  async update(
    id: number,
    updateTipoDocumentoDto: UpdateTipoDocumentoDto,
  ): Promise<TipoDocumento> {
    const tipoDoc = await this.findOne(id);
    this.tipoDocRepository.merge(tipoDoc, updateTipoDocumentoDto);
    return await this.tipoDocRepository.save(tipoDoc);
  }

  async remove(id: number) {
    const tipoDoc = await this.findOne(id);
    await this.tipoDocRepository.remove(tipoDoc);
    return {
      message: `El tipo de documento con el ID ${id} ha sido eliminado.`,
    };
  }
}
