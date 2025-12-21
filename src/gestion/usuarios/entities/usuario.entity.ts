/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Persona } from '../../personas/entities/persona.entity';
import { Role } from '../../../referenciales/parametros/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'int', unsigned: true })
  persona_id: number;

  @Column({ type: 'int', unsigned: true })
  rol_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @Column({
    type: 'boolean',
    name: 'es_temporal',
    default: false,
    comment:
      'Indica si el usuario fue creado automáticamente durante una cotización rápida',
  })
  es_temporal: boolean;

  @ManyToOne(() => Persona, { eager: true })
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'rol_id' })
  rol: Role;

  @BeforeInsert()
  async hashPassword() {
    // Solo hasheamos si no parece estar hasheado ya (por seguridad doble)
    if (!this.password.startsWith('$2b$')) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}
