/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductoSeguroDto } from './dto/create-producto-seguro.dto';
import { UpdateProductoSeguroDto } from './dto/update-producto-seguro.dto';
import { ProductoSeguro } from './entities/producto_seguro.entity';
import { Aseguradora } from '../../../principales/aseguradora/entities/aseguradora.entity';
import { TipoSeguro } from '../../parametros/tipo-seguro/entities/tipo-seguro.entity';

@Injectable()
export class ProductosSeguroService {
  constructor(
    @InjectRepository(ProductoSeguro)
    private readonly productoRepository: Repository<ProductoSeguro>,
    @InjectRepository(Aseguradora)
    private readonly aseguradoraRepository: Repository<Aseguradora>,
    @InjectRepository(TipoSeguro)
    private readonly tipoDeSeguroRepository: Repository<TipoSeguro>,
  ) {}

  async create(createDto: CreateProductoSeguroDto): Promise<ProductoSeguro> {
    const aseguradora = await this.aseguradoraRepository.findOne({
      where: { id: createDto.aseguradora_id },
    });
    if (!aseguradora) {
      throw new NotFoundException(
        `La aseguradora con el ID ${createDto.aseguradora_id} no fue encontrada.`,
      );
    }

    const tipoDeSeguro = await this.tipoDeSeguroRepository.findOne({
      where: { id: createDto.tipo_de_seguro_id },
    });
    if (!tipoDeSeguro) {
      throw new NotFoundException(
        `El tipo de seguro con el ID ${createDto.tipo_de_seguro_id} no fue encontrado.`,
      );
    }

    const nuevoProducto = this.productoRepository.create({
      ...createDto,
      aseguradora: aseguradora,
      tipo_de_seguro: tipoDeSeguro,
    });

    return await this.productoRepository.save(nuevoProducto);
  }

  async findAll(): Promise<ProductoSeguro[]> {
    return await this.productoRepository.find({
      relations: ['aseguradora', 'tipo_de_seguro'],
    });
  }

  async findOne(id: number): Promise<ProductoSeguro> {
    const producto = await this.productoRepository.findOne({
      where: { id },
      relations: ['aseguradora', 'tipo_de_seguro'],
    });
    if (!producto) {
      throw new NotFoundException(
        `El producto con el ID ${id} no fue encontrado.`,
      );
    }
    return producto;
  }

  async update(
    id: number,
    updateDto: UpdateProductoSeguroDto,
  ): Promise<ProductoSeguro> {
    const producto = await this.findOne(id);

    if (
      updateDto.aseguradora_id &&
      updateDto.aseguradora_id !== producto.aseguradora.id
    ) {
      const nuevaAseguradora = await this.aseguradoraRepository.findOne({
        where: { id: updateDto.aseguradora_id },
      });
      if (!nuevaAseguradora) {
        throw new NotFoundException(
          `La aseguradora con el ID ${updateDto.aseguradora_id} no fue encontrada.`,
        );
      }
      producto.aseguradora = nuevaAseguradora;
    }

    if (
      updateDto.tipo_de_seguro_id &&
      updateDto.tipo_de_seguro_id !== producto.tipo_de_seguro.id
    ) {
      const nuevoTipo = await this.tipoDeSeguroRepository.findOne({
        where: { id: updateDto.tipo_de_seguro_id },
      });
      if (!nuevoTipo) {
        throw new NotFoundException(
          `El tipo de seguro con el ID ${updateDto.tipo_de_seguro_id} no fue encontrado.`,
        );
      }
      producto.tipo_de_seguro = nuevoTipo;
    }

    // Fusionar el resto de las propiedades
    const { aseguradora_id, tipo_de_seguro_id, ...rest } = updateDto;
    Object.assign(producto, rest);

    return await this.productoRepository.save(producto);
  }

  async remove(id: number) {
    const producto = await this.findOne(id);
    await this.productoRepository.remove(producto);
    return { message: `El producto con el ID ${id} ha sido eliminado.` };
  }
}
