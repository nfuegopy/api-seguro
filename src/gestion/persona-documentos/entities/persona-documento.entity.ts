/* eslint-disable prettier/prettier */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Persona } from '../../personas/entities/persona.entity';
import { TipoDocumento } from '../../../referenciales/parametros/tipos-documento/entities/tipos-documento.entity';

@Entity('persona_documentos')
export class PersonaDocumento {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  numero: string;

  @Column({ type: 'date', nullable: true })
  fecha_vencimiento: Date;

  @Column({ type: 'int', unsigned: true })
  persona_id: number;

  @Column({ type: 'int', unsigned: true })
  tipo_documento_id: number;

  @ManyToOne(() => Persona, (persona) => persona.documentos, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'persona_id' })
  persona: Persona;

  @ManyToOne(() => TipoDocumento, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'tipo_documento_id' })
  tipoDocumento: TipoDocumento;
}
