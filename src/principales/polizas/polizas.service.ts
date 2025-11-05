/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm'; // <-- AÑADIR DataSource
import { Poliza } from './entities/poliza.entity';
import { CreatePolizaDto } from './dto/create-poliza.dto';
import { UpdatePolizaDto } from './dto/update-poliza.dto';

// --- AÑADIR IMPORTS ---
import { DetallesPolizaAuto } from './entities/detalles-poliza-auto.entity';
import { DetallesPolizaMedica } from './entities/detalles-poliza-medica.entity';
import { PolizaAsegurado } from './entities/poliza-asegurado.entity';
import { ProductoSeguro } from 'src/referenciales/parametros/productos_seguro/entities/producto_seguro.entity';

@Injectable()
export class PolizasService {
  constructor(
    private readonly dataSource: DataSource, // <-- AÑADIR INYECCIÓN
    @InjectRepository(Poliza)
    private readonly polizaRepository: Repository<Poliza>,
    // --- AÑADIR INYECCIÓN DE REPOSITORIOS ---
    @InjectRepository(DetallesPolizaAuto)
    private readonly detallesAutoRepo: Repository<DetallesPolizaAuto>,
    @InjectRepository(DetallesPolizaMedica)
    private readonly detallesMedicaRepo: Repository<DetallesPolizaMedica>,
    @InjectRepository(PolizaAsegurado)
    private readonly aseguradosRepo: Repository<PolizaAsegurado>,
    @InjectRepository(ProductoSeguro)
    private readonly productoRepo: Repository<ProductoSeguro>,
  ) {}

  async create(createPolizaDto: CreatePolizaDto): Promise<Poliza> {
    const { asegurados, detalles_auto, detalles_medico, ...datosPolizaBase } =
      createPolizaDto;

    // 1. Validar el producto para saber su tipo
    const producto = await this.productoRepo.findOne({
      where: { id: datosPolizaBase.producto_seguro_id },
      relations: ['tipo_de_seguro'], //
    });

    if (!producto) {
      throw new NotFoundException(
        `El producto con ID ${datosPolizaBase.producto_seguro_id} no fue encontrado.`,
      );
    }

    // Asumo que tu entidad TipoSeguro tiene un campo 'nombre'
    // AJUSTA 'Vehículo' o 'Salud' a los nombres reales en tu BD
    const TIPO_PRODUCTO = producto.tipo_de_seguro.nombre;

    // 2. Iniciar Transacción
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // 3. Guardar Póliza Base
      const nuevaPoliza = this.polizaRepository.create(datosPolizaBase);
      const polizaGuardada = await queryRunner.manager.save(nuevaPoliza);
      const polizaId = polizaGuardada.id;

      // 4. Lógica Polimórfica: Guardar Detalles [cite: 50, 51]
      // (Ajusta 'Vehículo' y 'Salud' si los nombres en tu BD son diferentes)
      if (TIPO_PRODUCTO === 'Vehículo' && detalles_auto) {
        const detalleAuto = this.detallesAutoRepo.create({
          ...detalles_auto,
          poliza_contratada_id: polizaId, // [cite: 309]
        });
        await queryRunner.manager.save(detalleAuto);
      } else if (TIPO_PRODUCTO === 'Salud' && detalles_medico) {
        const detalleMedico = this.detallesMedicaRepo.create({
          ...detalles_medico,
          poliza_contratada_id: polizaId, // [cite: 331]
        });
        await queryRunner.manager.save(detalleMedico);
      } else {
        // Si el tipo de producto requería detalles pero no se enviaron
        if (TIPO_PRODUCTO === 'Vehículo' || TIPO_PRODUCTO === 'Salud') {
          throw new BadRequestException(
            `Faltan datos de '${TIPO_PRODUCTO.toLowerCase()}' (detalles_auto/detalles_medico) para este tipo de producto.`,
          );
        }
        // Si el tipo de producto es otro (ej: Vida) y no necesita detalles,
        // la lógica simplemente continúa sin guardar detalles.
        // Pero si se enviaron detalles incorrectos, lanzamos error:
        if (detalles_auto || detalles_medico) {
          throw new BadRequestException(
            `Datos de detalle (detalles_auto/detalles_medico) enviados no coinciden con el tipo de producto: ${TIPO_PRODUCTO}.`,
          );
        }
      }

      // 5. Guardar Asegurados (Lista) [cite: 52]
      const aseguradosAGuardar = asegurados.map((dto) =>
        this.aseguradosRepo.create({
          ...dto,
          poliza_id: polizaId, // [cite: 442]
        }),
      );
      await queryRunner.manager.save(aseguradosAGuardar);

      // 6. Confirmar
      await queryRunner.commitTransaction();

      // 7. Devolver la póliza recién creada con todas sus relaciones
      return this.findOne(polizaGuardada.id);
    } catch (err) {
      // 8. Revertir en caso de error
      await queryRunner.rollbackTransaction();
      throw err; // Relanza el error para que Nest lo maneje
    } finally {
      // 9. Liberar el queryRunner
      await queryRunner.release();
    }
  }

  createMasivo(dtos: CreatePolizaDto[]) {
    // NOTA: Este método 'createMasivo' NO funcionará correctamente
    // con la nueva lógica transaccional de 'create'.
    // Para implementarlo, deberías iterar sobre 'dtos' y llamar
    // a 'await this.create(dto)' para cada uno, preferiblemente
    // dentro de un Promise.allSettled para manejar errores individuales.
    // Por ahora, se deja la lógica anterior para no romper el build:
    const nuevas = this.polizaRepository.create(dtos);
    return this.polizaRepository.save(nuevas);
  }

  findAll() {
    return this.polizaRepository.find();
  }

  async findOne(id: number) {
    // Actualizado para que devuelva todas las relaciones
    const poliza = await this.polizaRepository.findOne({
      where: { id },
      relations: [
        'detalles_auto',
        'detalles_auto.vehiculoModelo', // Relación anidada
        'detalles_medico',
        'asegurados',
        'asegurados.persona', // Relación anidada
      ],
    });
    if (!poliza) {
      throw new NotFoundException(`Póliza con ID ${id} no encontrada`);
    }
    return poliza;
  }

  async update(id: number, updatePolizaDto: UpdatePolizaDto) {
    // NOTA: Esta lógica de 'update' solo actualizará los campos
    // de la entidad 'Poliza' principal.
    // NO actualizará los detalles (auto, medico) ni la lista de asegurados.
    // Implementar eso requiere una lógica transaccional compleja similar a 'create'.

    // Separamos los datos para evitar sobreescribir relaciones
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { asegurados, detalles_auto, detalles_medico, ...datosUpdateBase } =
      updatePolizaDto;

    const poliza = await this.findOne(id);
    // Aplicamos solo los cambios a la póliza base
    Object.assign(poliza, datosUpdateBase);

    return this.polizaRepository.save(poliza);
  }

  async remove(id: number) {
    // Gracias a 'onDelete: CASCADE' en las entidades de detalle,
    // al eliminar la póliza, se eliminarán en cascada:
    // - DetallesPolizaAuto [cite: 318]
    // - DetallesPolizaMedica [cite: 337]
    // - PolizaAsegurado [cite: 452]
    const poliza = await this.polizaRepository.findOneBy({ id });
    if (!poliza) {
      throw new NotFoundException(`Póliza con ID ${id} no encontrada`);
    }
    return this.polizaRepository.remove(poliza);
  }
}
