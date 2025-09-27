/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
// Asumiendo que tienes una entidad ProductoSeguro, la importamos para la relación
// import { ProductoSeguro } from '../../productos-seguro/entities/producto-seguro.entity';

@Entity('niveles_cobertura')
export class NivelCobertura {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true, name: 'producto_seguro_id' })
  producto_seguro_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre_nivel: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: false })
  prima_anual_base: number;

  // Si tienes la entidad ProductoSeguro, puedes descomentar esta relación
  /*
  @ManyToOne(() => ProductoSeguro, (producto) => producto.nivelesCobertura, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'producto_seguro_id' })
  productoSeguro: ProductoSeguro;
  */
}