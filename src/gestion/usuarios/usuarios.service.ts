/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */

import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { PersonasService } from '../personas/personas.service';
import { Persona } from '../personas/entities/persona.entity';
import { PersonaDocumento } from '../persona-documentos/entities/persona-documento.entity';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(PersonaDocumento)
    private readonly documentoRepository: Repository<PersonaDocumento>,
    private readonly personasService: PersonasService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // MODIFICACIÓN CLAVE: Desestructuramos 'es_temporal' forzando el tipo 'any'
    // para que acepte propiedades extras que no están en el DTO original.
    const {
      email,
      password,
      rol_id,
      persona_id,
      persona: personaData,
      es_temporal, // <--- Capturamos la bandera aquí
    } = createUsuarioDto as any;

    const emailExistente = await this.usuarioRepository.findOneBy({ email });
    if (emailExistente) {
      throw new ConflictException(`El email ${email} ya está en uso.`);
    }

    let personaParaAsociar: Persona;

    if (persona_id) {
      personaParaAsociar = await this.personasService.findOne(persona_id);
    } else if (personaData) {
      const primerDocumento = personaData.documentos[0];
      const documentoExistente = await this.documentoRepository.findOne({
        where: {
          tipo_documento_id: primerDocumento.tipo_documento_id,
          numero: primerDocumento.numero,
        },
        relations: ['persona'],
      });

      personaParaAsociar = documentoExistente
        ? documentoExistente.persona
        : await this.personasService.create(personaData);
    } else {
      throw new BadRequestException(
        'Debe proporcionar un "persona_id" o los datos de una "persona".',
      );
    }

    const nuevoUsuario = this.usuarioRepository.create({
      email,
      password,
      rol_id,
      persona_id: personaParaAsociar.id,
      // Guardamos la bandera. Si no viene (creación normal), será false.
      es_temporal: es_temporal || false,
    });

    return await this.usuarioRepository.save(nuevoUsuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado.`);
    }
    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(id);
    this.usuarioRepository.merge(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
    return { message: `Usuario con ID ${id} eliminado.` };
  }

  // Se mantiene con las relaciones necesarias para Auth y Cotizaciones
  async findByEmail(email: string): Promise<Usuario | undefined> {
    const user = await this.usuarioRepository.findOne({
      where: { email },
      relations: ['persona', 'rol'],
    });
    return user ?? undefined;
  }

  // Metodo creado para cotizacion y creacion automatica de usuarios
  async findOrCreateByEmail(
    email: string,
    datosPersona?: any,
  ): Promise<Usuario> {
    // 1. Buscamos si ya existe
    const usuarioExistente = await this.usuarioRepository.findOne({
      where: { email },
      relations: ['persona', 'rol'],
    });

    if (usuarioExistente) {
      return usuarioExistente;
    }

    // 2. Si no existe, creamos uno nuevo como Cliente
    const ROL_CLIENTE_ID = 2;

    // Preparamos el objeto con la bandera es_temporal: true
    const nuevoUsuarioDto = {
      email: email,
      password: 'NuevoUsuario123', // Password temporal
      rol_id: ROL_CLIENTE_ID,
      persona: datosPersona,
      es_temporal: true, // Importante: Marcamos como temporal
    } as any;

    // Reutilizamos el método create (que ahora ya sabe leer es_temporal)
    return await this.create(nuevoUsuarioDto);
  }
}
