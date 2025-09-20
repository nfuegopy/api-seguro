/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm';
import { Menu } from '../../menu/entities/menu.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('menu_rol')
@Unique(['menu_id', 'rol_id'])
export class MenuRol {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'int', unsigned: true })
  menu_id: number;

  @Column({ type: 'int', unsigned: true })
  rol_id: number;

  @Column({ type: 'boolean', default: false })
  permitir_listar: boolean;

  @Column({ type: 'boolean', default: false })
  permitir_guardar: boolean;

  @Column({ type: 'boolean', default: false })
  permitir_editar: boolean;

  @Column({ type: 'boolean', default: false })
  permitir_eliminar: boolean;

  @ManyToOne(() => Menu, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_id' })
  menu: Menu;

  @ManyToOne(() => Role, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rol_id' })
  rol: Role;
}
