/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('secciones_web')
export class SeccionWeb {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  titulo: string;

  @Column({ type: 'text', nullable: false })
  descripcion: string;

  @Column({ type: 'text', nullable: false })
  imagen_url: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  orden: number;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  enlace_url: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    default: 'Ver Detalles',
  })
  texto_boton: string;
}
