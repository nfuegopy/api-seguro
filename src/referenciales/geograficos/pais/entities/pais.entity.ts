/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('paises') le dice a TypeORM que esta clase representa la tabla "paises".
@Entity('paises')
export class Pais {
  // @PrimaryGeneratedColumn define la columna 'id' como clave primaria autoincremental.
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  // @Column define la columna 'nombre'.
  // Es un varchar(100), no puede ser nulo (nullable: false) y debe ser único.
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  nombre: string;
}
