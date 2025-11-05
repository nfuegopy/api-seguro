/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Poliza } from './poliza.entity';
import { Persona } from 'src/gestion/personas/entities/persona.entity';

// Enum basado en la definición de la BD [cite: 444]
export enum Parentesco {
  TITULAR = 'TITULAR',
  CONYUGE = 'CONYUGE',
  HIJO_A = 'HIJO/A',
  OTRO = 'OTRO',
}

@Entity('poliza_asegurados') // [cite: 440]
@Unique(['poliza_id', 'persona_id']) // [cite: 450]
export class PolizaAsegurado {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true, name: 'poliza_id' }) // [cite: 442]
  poliza_id: number;

  @Column({ type: 'int', unsigned: true, name: 'persona_id' }) // [cite: 443]
  persona_id: number;

  @Column({
    type: 'enum',
    enum: Parentesco,
  }) // [cite: 444]
  parentesco: Parentesco;

  @Column({ type: 'date', name: 'fecha_alta_cobertura' }) // [cite: 445]
  fecha_alta_cobertura: Date;

  @Column({ type: 'boolean', default: false, name: 'es_titular_tecnico' }) // [cite: 446]
  es_titular_tecnico: boolean;

  // Relaciones
  @ManyToOne(() => Poliza, (poliza) => poliza.asegurados, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }) // [cite: 452]
  @JoinColumn({ name: 'poliza_id' })
  poliza: Poliza;

  @ManyToOne(() => Persona, {
    nullable: false,
    eager: true, // Carga la info de la persona automáticamente
    onDelete: 'RESTRICT',
  }) // [cite: 457]
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;
}
