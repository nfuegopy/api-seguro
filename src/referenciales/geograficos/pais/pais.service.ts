/* eslint-disable prettier/prettier */

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { CreatePaisDto } from './dto/create-pais.dto';
import { UpdatePaisDto } from './dto/update-pais.dto';
import { Pais } from './entities/pais.entity';

@Injectable()
export class PaisService {
  // Inyectamos el repositorio de 'Pais' para poder interactuar con la base de datos.
  constructor(
    @InjectRepository(Pais)
    private readonly paisRepository: Repository<Pais>,
  ) {}

  // Crea una sola instancia de País.
  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
    const nuevoPais = this.paisRepository.create(createPaisDto);
    return await this.paisRepository.save(nuevoPais);
  }

  // Crea múltiples instancias de País a partir de un arreglo.
  async createMasivo(createPaisDtos: CreatePaisDto[]): Promise<Pais[]> {
    const nuevosPaises = this.paisRepository.create(createPaisDtos);
    return await this.paisRepository.save(nuevosPaises);
  }

  // Busca todos los países. Si se provee un 'nombre', filtra los resultados.
  async findAll(nombre?: string): Promise<Pais[]> {
    const options: FindManyOptions<Pais> = {};
    if (nombre) {
      // Usamos 'Like' para buscar coincidencias parciales (ej: "Para" encuentra "Paraguay").
      options.where = { nombre: Like(`%${nombre}%`) };
    }
    return await this.paisRepository.find(options);
  }

  // Busca un país por su ID. Si no lo encuentra, lanza un error 404.
  async findOne(id: number): Promise<Pais> {
    const pais = await this.paisRepository.findOne({ where: { id } });
    if (!pais) {
      throw new NotFoundException(`El país con el ID ${id} no fue encontrado.`);
    }
    return pais;
  }

  // Actualiza un país. Primero lo busca, luego aplica los cambios y guarda.
  async update(id: number, updatePaisDto: UpdatePaisDto): Promise<Pais> {
    const pais = await this.findOne(id);
    this.paisRepository.merge(pais, updatePaisDto);
    return await this.paisRepository.save(pais);
  }

  // Elimina un país. Primero lo busca y luego lo remueve.
  async remove(id: number) {
    const pais = await this.findOne(id);
    await this.paisRepository.remove(pais);
    return { message: `El país con el ID ${id} ha sido eliminado.` };
  }
}
