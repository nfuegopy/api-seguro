/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { TipoHtml } from '../enum/tipo-html.enum';

@Entity('campos_formulario')
@Unique(['entidad_destino', 'key_tecnica']) // Basado en idx_entidad_key_unica
export class CampoFormulario {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'entidad_destino' })
  entidad_destino: string;

  @Column({ type: 'varchar', length: 100, name: 'key_tecnica' })
  key_tecnica: string;

  @Column({ type: 'varchar', length: 150 })
  etiqueta: string;

  @Column({
    type: 'enum',
    enum: TipoHtml,
    name: 'tipo_html',
    default: TipoHtml.TEXT,
  })
  tipo_html: TipoHtml;

  @Column({ type: 'varchar', length: 255, nullable: true })
  placeholder: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'api_endpoint_options',
    nullable: true,
  })
  api_endpoint_options: string;
}
