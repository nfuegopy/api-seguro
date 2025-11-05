/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Poliza } from './poliza.entity';

// Enum basado en la definición de la BD [cite: 332]
export enum TipoPlanMedico {
  INDIVIDUAL = 'Individual',
  FAMILIAR = 'Familiar',
  CORPORATIVO = 'Corporativo',
}

@Entity('detalles_poliza_medica') // [cite: 329]
export class DetallesPolizaMedica {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'poliza_contratada_id',
    unique: true,
  }) // [cite: 331]
  poliza_contratada_id: number;

  @Column({
    type: 'enum',
    enum: TipoPlanMedico,
    name: 'tipo_plan',
  }) // [cite: 332]
  tipo_plan: TipoPlanMedico;

  @Column({ type: 'boolean', default: true, name: 'declaracion_salud_ok' }) // [cite: 333]
  declaracion_salud_ok: boolean;

  @Column({ type: 'text', nullable: true, name: 'observaciones_salud' }) // [cite: 334]
  observaciones_salud: string;

  // Relación Inversa con la Póliza
  @OneToOne(() => Poliza, (poliza) => poliza.detalles_medico, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }) // [cite: 337]
  @JoinColumn({ name: 'poliza_contratada_id' })
  poliza: Poliza;
}
