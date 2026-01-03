/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    // 1. Validar que existan los IDs
    await this.validarRelaciones(
      dto.producto_seguro_id,
      dto.campo_formulario_id,
    );

    // 2. Validar que no esté duplicado (Evita errores futuros)
    const existe = await this.repo.findOne({
      where: {
        productoSeguro: { id: dto.producto_seguro_id },
        campoFormulario: { id: dto.campo_formulario_id },
      },
    });

    if (existe) {
      throw new BadRequestException(
        'Este campo ya está asignado a este producto.',
      );
    }

    // 3. Crear mapeando explícitamente las relaciones
    // ESTA ES LA SOLUCIÓN AL ERROR 500:
    const nuevo = this.repo.create({
      es_requerido: dto.es_requerido,
      orden: dto.orden,
      // Asignamos las relaciones usando objetos con ID
      productoSeguro: { id: dto.producto_seguro_id } as any,
      campoFormulario: { id: dto.campo_formulario_id } as any,
      // También asignamos los campos planos por si tu entidad los requiere explícitamente
      producto_seguro_id: dto.producto_seguro_id,
      campo_formulario_id: dto.campo_formulario_id,
    });

    return this.repo.save(nuevo);
  }

  findAll(): Promise<ProductoFormularioCampo[]> {
    return this.repo.find({
      relations: ['productoSeguro', 'campoFormulario'], // Agregado para ver los nombres en el listado
      order: { orden: 'ASC' },
    });
  }

  async findOne(id: number): Promise<ProductoFormularioCampo> {
    const item = await this.repo.findOne({
      where: { id },
      relations: ['productoSeguro', 'campoFormulario'],
    });
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

    // Si cambiaron los IDs, validamos de nuevo
    if (dto.producto_seguro_id || dto.campo_formulario_id) {
      await this.validarRelaciones(productoId, campoId);
    }

    // Merge manual para relaciones si vienen en el DTO
    if (dto.producto_seguro_id) {
      item.productoSeguro = { id: dto.producto_seguro_id } as any;
      item.producto_seguro_id = dto.producto_seguro_id;
    }
    if (dto.campo_formulario_id) {
      item.campoFormulario = { id: dto.campo_formulario_id } as any;
      item.campo_formulario_id = dto.campo_formulario_id;
    }
    if (dto.es_requerido !== undefined) item.es_requerido = dto.es_requerido;
    if (dto.orden !== undefined) item.orden = dto.orden;

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
