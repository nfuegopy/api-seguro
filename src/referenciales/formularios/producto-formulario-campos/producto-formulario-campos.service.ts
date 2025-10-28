/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoFormularioCampo } from './entities/producto-formulario-campo.entity';
import { CreateProductoFormularioCampoDto } from './dto/create-producto-formulario-campo.dto';
import { UpdateProductoFormularioCampoDto } from './dto/update-producto-formulario-campo.dto';
import { ProductoSeguro } from 'src/referenciales/parametros/productos_seguro/entities/producto_seguro.entity';
import { CampoFormulario } from '../campos-formulario/entities/campo-formulario.entity';

@Injectable()
export class ProductoFormularioCamposService {
  constructor(
    @InjectRepository(ProductoFormularioCampo)
    private readonly repo: Repository<ProductoFormularioCampo>,
    @InjectRepository(ProductoSeguro)
    private readonly productoRepo: Repository<ProductoSeguro>,
    @InjectRepository(CampoFormulario)
    private readonly campoRepo: Repository<CampoFormulario>,
  ) {}

  async create(
    dto: CreateProductoFormularioCampoDto,
  ): Promise<ProductoFormularioCampo> {
    await this.validarRelaciones(
      dto.producto_seguro_id,
      dto.campo_formulario_id,
    );
    const nuevo = this.repo.create(dto);
    return this.repo.save(nuevo);
  }

  findAll(): Promise<ProductoFormularioCampo[]> {
    // Eager loading en la entidad trae las relaciones
    return this.repo.find();
  }

  async findOne(id: number): Promise<ProductoFormularioCampo> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(
        `La asignación de campo con ID ${id} no fue encontrada.`,
      );
    }
    return item;
  }

  async update(
    id: number,
    dto: UpdateProductoFormularioCampoDto,
  ): Promise<ProductoFormularioCampo> {
    const item = await this.findOne(id);

    const productoId = dto.producto_seguro_id ?? item.producto_seguro_id;
    const campoId = dto.campo_formulario_id ?? item.campo_formulario_id;
    await this.validarRelaciones(productoId, campoId);

    this.repo.merge(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { message: `La asignación con ID ${id} ha sido eliminada.` };
  }

  // Helper para validar que las FKs existan
  private async validarRelaciones(productoId: number, campoId: number) {
    const producto = await this.productoRepo.findOneBy({ id: productoId });
    if (!producto) {
      throw new NotFoundException(
        `El producto con ID ${productoId} no existe.`,
      );
    }

    const campo = await this.campoRepo.findOneBy({ id: campoId });
    if (!campo) {
      throw new NotFoundException(
        `El campo de formulario con ID ${campoId} no existe.`,
      );
    }
  }
}
