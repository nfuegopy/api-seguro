/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Ciudad } from '../../../referenciales/geograficos/ciudad/entities/ciudad.entity';
import { PersonaDocumento } from '../../persona-documentos/entities/persona-documento.entity';

@Entity('personas')
export class Persona {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  apellido: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  direccion: string;

  @Column({ type: 'int', unsigned: true, nullable: true })
  ciudad_id: number;

  @ManyToOne(() => Ciudad, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'ciudad_id' })
  ciudad: Ciudad;

  @OneToMany(() => PersonaDocumento, (documento) => documento.persona, {
    cascade: true,
    eager: true,
  })
  documentos: PersonaDocumento[];
}
