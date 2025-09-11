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
    const {
      email,
      password,
      rol_id,
      persona_id,
      persona: personaData,
    } = createUsuarioDto;

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

  //Service para utilizar con el Auth
  async findByEmail(email: string): Promise<Usuario | undefined> {
    const user = await this.usuarioRepository.findOne({
      where: { email },
    });
    return user ?? undefined; // Si user es null, devuelve undefined
  }
}
