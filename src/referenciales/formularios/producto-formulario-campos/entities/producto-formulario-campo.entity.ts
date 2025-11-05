/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { ProductoSeguro } from 'src/referenciales/parametros/productos_seguro/entities/producto_seguro.entity';
import { CampoFormulario } from '../../campos-formulario/entities/campo-formulario.entity';

@Entity('producto_formulario_campos')
@Unique(['producto_seguro_id', 'campo_formulario_id']) // Basado en idx_producto_campo_unico
export class ProductoFormularioCampo {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true, name: 'producto_seguro_id' })
  producto_seguro_id: number;

  @Column({ type: 'int', unsigned: true, name: 'campo_formulario_id' })
  campo_formulario_id: number;

  @Column({ type: 'boolean', name: 'es_requerido', default: true })
  es_requerido: boolean;

  @Column({ type: 'int', unsigned: true, default: 0 })
  orden: number;

  // --- Relaciones ---

  @ManyToOne(() => ProductoSeguro, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producto_seguro_id' })
  productoSeguro: ProductoSeguro;

  @ManyToOne(() => CampoFormulario, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campo_formulario_id' })
  campoFormulario: CampoFormulario;
}
