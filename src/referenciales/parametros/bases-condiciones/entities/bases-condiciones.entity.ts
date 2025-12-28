/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bases_condiciones')
export class BaseCondicion {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true, name: 'producto_seguro_id' })
  producto_seguro_id: number;

  @Column({ type: 'longtext', nullable: false })
  contenido: string;

  @Column({ type: 'varchar', length: 20, nullable: false, default: '1.0' })
  version: string;

  @Column({ type: 'date', nullable: false })
  fecha_publicacion: Date;

  // Si tienes la entidad ProductoSeguro, puedes agregar la relación ManyToOne aquí
}
