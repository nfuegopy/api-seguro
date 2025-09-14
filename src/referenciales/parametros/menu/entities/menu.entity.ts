/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { GrupoMenu } from '../../grupo-menu/entities/grupo-menu.entity';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion: string;

  @Column({ type: 'int', unsigned: true, nullable: false })
  grupo_menu_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  url: string;

  @Column({ type: 'text', nullable: true })
  icono: string;

  @ManyToOne(() => GrupoMenu, { nullable: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'grupo_menu_id' })
  grupoMenu: GrupoMenu;
}
