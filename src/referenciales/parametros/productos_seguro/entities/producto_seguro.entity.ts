/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Aseguradora } from '../../../../principales/aseguradora/entities/aseguradora.entity';
import { TipoSeguro } from '../../tipo-seguro/entities/tipo-seguro.entity';

@Entity('productos_seguro')
@Unique(['aseguradora', 'nombre_producto'])
export class ProductoSeguro {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  nombre_producto: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  descripcion_corta: string;

  @Column({ type: 'tinyint', width: 1, default: 1, nullable: false })
  activo: boolean;

  @Column({
    type: 'boolean',
    name: 'publicar_en_web',
    default: false,
    comment:
      'Permite que este producto sea seleccionado para la página pública.',
  })
  publicar_en_web: boolean;

  // --- Relación con Aseguradora ---
  @ManyToOne(() => Aseguradora, { nullable: false, eager: true })
  @JoinColumn({ name: 'aseguradora_id' })
  aseguradora: Aseguradora;

  // --- Relación con TipoSeguro ---
  @ManyToOne(() => TipoSeguro, { nullable: false, eager: true })
  @JoinColumn({ name: 'tipo_de_seguro_id' })
  tipo_de_seguro: TipoSeguro;
}
