/* eslint-disable prettier/prettier */

import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import { PersonaDocumento } from '../persona-documentos/entities/persona-documento.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PersonasService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
    @InjectRepository(PersonaDocumento)
    private readonly documentoRepository: Repository<PersonaDocumento>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createPersonaDto: CreatePersonaDto): Promise<Persona> {
    const { documentos, ...datosPersona } = createPersonaDto;

    for (const doc of documentos) {
      const documentoExistente = await this.documentoRepository.findOne({
        where: { tipo_documento_id: doc.tipo_documento_id, numero: doc.numero },
      });
      if (documentoExistente) {
        throw new ConflictException(
          `El documento con número ${doc.numero} ya está registrado.`,
        );
      }
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const nuevaPersona = this.personaRepository.create(datosPersona);
      const personaGuardada = await queryRunner.manager.save(nuevaPersona);

      const documentosAGuardar = documentos.map((doc) =>
        this.documentoRepository.create({
          ...doc,
          persona_id: personaGuardada.id,
        }),
      );
      await queryRunner.manager.save(documentosAGuardar);

      await queryRunner.commitTransaction();
      return this.findOne(personaGuardada.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(): Promise<Persona[]> {
    return await this.personaRepository.find();
  }

  async findOne(id: number): Promise<Persona> {
    const persona = await this.personaRepository.findOne({ where: { id } });
    if (!persona) {
      throw new NotFoundException(
        `La persona con el ID ${id} no fue encontrada.`,
      );
    }
    return persona;
  }

  async update(
    id: number,
    updatePersonaDto: UpdatePersonaDto,
  ): Promise<Persona> {
    const { documentos, ...datosPersona } = updatePersonaDto;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const persona = await this.findOne(id);
      this.personaRepository.merge(persona, datosPersona);
      await queryRunner.manager.save(persona);

      if (documentos) {
        for (const docDto of documentos) {
          if (docDto.id) {
            const documentoExistente = await this.documentoRepository.findOneBy(
              { id: docDto.id, persona_id: id },
            );
            if (!documentoExistente)
              throw new NotFoundException(
                `Documento con ID ${docDto.id} no encontrado para esta persona.`,
              );
            queryRunner.manager.merge(
              PersonaDocumento,
              documentoExistente,
              docDto,
            );
            await queryRunner.manager.save(documentoExistente);
          } else {
            const nuevoDocumento = this.documentoRepository.create({
              ...docDto,
              persona_id: id,
            });
            await queryRunner.manager.save(nuevoDocumento);
          }
        }
      }
      await queryRunner.commitTransaction();
      return this.findOne(id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: number) {
    const persona = await this.findOne(id);
    await this.personaRepository.remove(persona);
    return { message: `La persona con el ID ${id} ha sido eliminada.` };
  }
}
