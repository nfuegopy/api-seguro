/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Departamento } from '../../departamento/entities/departamento.entity';

@Entity('ciudades')
export class Ciudad {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'int', unsigned: true, nullable: false })
  departamento_id: number;

  // --- RELACIÓN MUCHOS A UNO ---
  // Muchas ciudades pueden pertenecer a UN departamento.
  @ManyToOne(() => Departamento, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'departamento_id' }) // Especifica la columna de la clave foránea.
  departamento: Departamento;
}
