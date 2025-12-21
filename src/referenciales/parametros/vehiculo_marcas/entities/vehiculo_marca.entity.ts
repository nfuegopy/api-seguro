/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vehiculo_marcas')
export class VehiculoMarca {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  nombre: string;

  @Column({
    type: 'decimal',
    precision: 4,
    scale: 2,
    default: 1.0,
    comment: 'Multiplicador de costo. Ej: 1.20 (+20%)',
  })
  factor_riesgo: number;
}
