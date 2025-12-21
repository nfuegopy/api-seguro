/* eslint-disable prettier/prettier */

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../../gestion/usuarios/entities/usuario.entity';
import { ProductoSeguro } from '../../../referenciales/parametros/productos_seguro/entities/producto_seguro.entity';
import { Poliza } from '../../polizas/entities/poliza.entity';

export enum EstadoCotizacion {
  PENDIENTE = 'PENDIENTE',
  ENVIADA = 'ENVIADA',
  CONTRATADA = 'CONTRATADA',
  VENCIDA = 'VENCIDA',
}

@Entity('cotizaciones')
export class Cotizacion {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true, name: 'usuario_id' })
  usuario_id: number;

  @Column({ type: 'int', unsigned: true, name: 'producto_seguro_id' })
  producto_seguro_id: number;

  // El campo JSON mágico para guardar datos flexibles
  @Column({ type: 'json', name: 'datos_vehiculo' })
  datos_vehiculo: Record<string, any>;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  precio_calculado: number;

  @CreateDateColumn({ name: 'fecha_solicitud' })
  fecha_solicitud: Date;

  @Column({
    type: 'enum',
    enum: EstadoCotizacion,
    default: EstadoCotizacion.PENDIENTE,
  })
  estado: EstadoCotizacion;

  @Column({
    type: 'int',
    unsigned: true,
    nullable: true,
    name: 'poliza_generada_id',
  })
  poliza_generada_id: number | null;

  // --- RELACIONES ---

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => ProductoSeguro)
  @JoinColumn({ name: 'producto_seguro_id' })
  productoSeguro: ProductoSeguro;

  @ManyToOne(() => Poliza)
  @JoinColumn({ name: 'poliza_generada_id' })
  polizaGenerada: Poliza;
}
