/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Poliza } from './poliza.entity';
import { VehiculoModelo } from 'src/referenciales/parametros/vehiculo_modelos/entities/vehiculo_modelo.entity';

// Enum basado en la definición de la BD [cite: 314]
export enum UsoVehiculo {
  PARTICULAR = 'Particular',
  COMERCIAL = 'Comercial',
  TRANSPORTE = 'Transporte',
}

@Entity('detalles_poliza_auto') // [cite: 307]
export class DetallesPolizaAuto {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id: number;

  @Column({
    type: 'int',
    unsigned: true,
    name: 'poliza_contratada_id',
    unique: true,
  }) // [cite: 309]
  poliza_contratada_id: number;

  @Column({ type: 'int', unsigned: true, name: 'vehiculo_modelo_id' }) // [cite: 310]
  vehiculo_modelo_id: number;

  @Column({ type: 'smallint', unsigned: true }) // [cite: 311]
  anio: number;

  @Column({ type: 'varchar', length: 20, unique: true }) // [cite: 312]
  matricula: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    name: 'numero_chasis_vin',
  }) // [cite: 313]
  numero_chasis_vin: string;

  @Column({
    type: 'enum',
    enum: UsoVehiculo,
    name: 'uso_vehiculo',
  }) // [cite: 314]
  uso_vehiculo: UsoVehiculo;

  // Relación Inversa con la Póliza
  @OneToOne(() => Poliza, (poliza) => poliza.detalles_auto, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  }) // [cite: 318]
  @JoinColumn({ name: 'poliza_contratada_id' })
  poliza: Poliza;

  // Relación con el Modelo del Vehículo
  @ManyToOne(() => VehiculoModelo, {
    nullable: false,
    eager: true,
    onDelete: 'RESTRICT',
  }) // [cite: 322]
  @JoinColumn({ name: 'vehiculo_modelo_id' })
  vehiculoModelo: VehiculoModelo;
}
