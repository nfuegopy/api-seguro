/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pais } from '../../pais/entities/pais.entity';

@Entity('departamentos')
export class Departamento {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'int', unsigned: true, nullable: false })
  pais_id: number;

  // --- RELACIÓN MUCHOS A UNO ---
  // Muchos departamentos pueden pertenecer a UN país.
  @ManyToOne(() => Pais, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'pais_id' }) // Especifica que la columna 'pais_id' es la clave foránea.
  pais: Pais;
}
