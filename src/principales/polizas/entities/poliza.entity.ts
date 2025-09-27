/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum EstadoPoliza {
  BORRADOR = 'Borrador',
  ACTIVA = 'Activa',
  VENCIDA = 'Vencida',
  CANCELADA = 'Cancelada',
}

@Entity('polizas_contratadas')
export class Poliza {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  numero_poliza: string;

  @Column({ type: 'int', unsigned: true, name: 'usuario_id' })
  usuario_id: number;

  @Column({ type: 'int', unsigned: true, name: 'producto_seguro_id' })
  producto_seguro_id: number;

  @Column({ type: 'int', unsigned: true, name: 'nivel_cobertura_id' })
  nivel_cobertura_id: number;

  @Column({ type: 'date', nullable: false })
  fecha_emision: Date;

  @Column({ type: 'date', nullable: false })
  fecha_inicio_vigencia: Date;

  @Column({ type: 'date', nullable: false })
  fecha_fin_vigencia: Date;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  prima_total: number;

  @Column({
    type: 'enum',
    enum: EstadoPoliza,
    default: EstadoPoliza.BORRADOR,
  })
  estado: EstadoPoliza;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha_creacion: Date;

  @UpdateDateColumn({ name: 'fecha_actualizacion' })
  fecha_actualizacion: Date;

  // Aquí puedes agregar las relaciones ManyToOne con las otras entidades si las tienes creadas
}