/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { VehiculoMarca } from '../../vehiculo_marcas/entities/vehiculo_marca.entity';

@Entity('vehiculo_modelos')
@Unique(['marca', 'nombre']) // Constraint UNIQUE KEY `idx_modelo_unico_por_marca` (`marca_id`,`nombre`)
export class VehiculoModelo {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  // --- Relación con VehiculoMarca ---
  @ManyToOne(() => VehiculoMarca, { nullable: false, eager: true }) // eager: true para que siempre traiga la marca
  @JoinColumn({ name: 'marca_id' }) // Especifica la columna de la clave foránea
  marca: VehiculoMarca;
}
