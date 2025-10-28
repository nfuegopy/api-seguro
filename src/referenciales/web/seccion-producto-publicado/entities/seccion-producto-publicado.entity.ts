/* eslint-disable prettier/prettier */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { SeccionWeb } from '../../secciones-web/entities/seccion-web.entity';
import { ProductoSeguro } from 'src/referenciales/parametros/productos_seguro/entities/producto_seguro.entity';

@Entity('seccion_producto_publicado')
@Unique(['seccion_web_id', 'producto_seguro_id']) // Basado en idx_seccion_producto_unico
export class SeccionProductoPublicado {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true, name: 'seccion_web_id' })
  seccion_web_id: number;

  @Column({ type: 'int', unsigned: true, name: 'producto_seguro_id' })
  producto_seguro_id: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  orden: number;

  // --- Relaciones ---

  @ManyToOne(() => SeccionWeb, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seccion_web_id' })
  seccionWeb: SeccionWeb;

  @ManyToOne(() => ProductoSeguro, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'producto_seguro_id' })
  productoSeguro: ProductoSeguro;
}
