/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeccionProductoPublicado } from './entities/seccion-producto-publicado.entity';
import { CreateSeccionProductoPublicadoDto } from './dto/create-seccion-producto-publicado.dto';
import { UpdateSeccionProductoPublicadoDto } from './dto/update-seccion-producto-publicado.dto';
import { SeccionWeb } from '../secciones-web/entities/seccion-web.entity';
import { ProductoSeguro } from 'src/referenciales/parametros/productos_seguro/entities/producto_seguro.entity';

@Injectable()
export class SeccionProductoPublicadoService {
  constructor(
    @InjectRepository(SeccionProductoPublicado)
    private readonly repo: Repository<SeccionProductoPublicado>,
    @InjectRepository(SeccionWeb)
    private readonly seccionWebRepo: Repository<SeccionWeb>,
    @InjectRepository(ProductoSeguro)
    private readonly productoRepo: Repository<ProductoSeguro>,
  ) {}

  async create(
    dto: CreateSeccionProductoPublicadoDto,
  ): Promise<SeccionProductoPublicado> {
    await this.validarRelaciones(dto.seccion_web_id, dto.producto_seguro_id);
    const nuevo = this.repo.create(dto);
    return this.repo.save(nuevo);
  }

  findAll(): Promise<SeccionProductoPublicado[]> {
    // Las relaciones 'seccionWeb' y 'productoSeguro' se cargan gracias a eager: true
    return this.repo.find();
  }

  async findOne(id: number): Promise<SeccionProductoPublicado> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(
        `La publicación de producto con ID ${id} no fue encontrada.`,
      );
    }
    return item;
  }

  async update(
    id: number,
    dto: UpdateSeccionProductoPublicadoDto,
  ): Promise<SeccionProductoPublicado> {
    const item = await this.findOne(id);

    const seccionId = dto.seccion_web_id ?? item.seccion_web_id;
    const productoId = dto.producto_seguro_id ?? item.producto_seguro_id;
    await this.validarRelaciones(seccionId, productoId);

    this.repo.merge(item, dto);
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return {
      message: `La publicación de producto con ID ${id} ha sido eliminada.`,
    };
  }

  // Helper para validar que las FKs existan
  private async validarRelaciones(seccionId: number, productoId: number) {
    const seccion = await this.seccionWebRepo.findOneBy({ id: seccionId });
    if (!seccion) {
      throw new NotFoundException(
        `La sección web con ID ${seccionId} no existe.`,
      );
    }

    const producto = await this.productoRepo.findOneBy({ id: productoId });
    if (!producto) {
      throw new NotFoundException(
        `El producto con ID ${productoId} no existe.`,
      );
    }

    if (!producto.publicar_en_web) {
      throw new NotFoundException(
        `El producto con ID ${productoId} no está habilitado para publicarse en la web (publicar_en_web = false).`,
      );
    }
  }
}
