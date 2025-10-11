/* eslint-disable prettier/prettier */

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeccionWebDto } from './dto/create-seccion-web.dto';
import { UpdateSeccionWebDto } from './dto/update-seccion-web.dto';
import { SeccionWeb } from './entities/seccion-web.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 as uuidv4 } from 'uuid';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class SeccionesWebService {
  private bucket: Bucket;
  constructor(
    @InjectRepository(SeccionWeb)
    private readonly seccionWebRepository: Repository<SeccionWeb>,
    private readonly firebaseService: FirebaseService,
  ) {}

  async create(
    createDto: CreateSeccionWebDto,
    file: Express.Multer.File,
  ): Promise<SeccionWeb> {
    try {
      const imageUrl = await this.uploadFile(file);

      const nuevaSeccion = this.seccionWebRepository.create({
        ...createDto,
        imagen_url: imageUrl,
      });

      return await this.seccionWebRepository.save(nuevaSeccion);
    } catch (error) {
      console.error('Error al crear la sección web:', error);
      throw new InternalServerErrorException(
        'No se pudo crear la sección y subir la imagen.',
      );
    }
  }

  async findAll(): Promise<SeccionWeb[]> {
    return this.seccionWebRepository.find({
      order: {
        orden: 'ASC',
      },
    });
  }

  // --- NUEVO ENDPOINT: Listar solo activos ---
  async findAllActive(): Promise<SeccionWeb[]> {
    return this.seccionWebRepository.find({
      where: { activo: true },
      order: {
        orden: 'ASC',
      },
    });
  }

  // --- NUEVO ENDPOINT: Buscar uno por ID ---
  async findOne(id: number): Promise<SeccionWeb> {
    const seccion = await this.seccionWebRepository.findOne({ where: { id } });
    if (!seccion) {
      throw new NotFoundException(
        `La sección web con el ID ${id} no fue encontrada.`,
      );
    }
    return seccion;
  }

  // --- NUEVO ENDPOINT: Actualizar ---
  async update(
    id: number,
    updateDto: UpdateSeccionWebDto,
    file?: Express.Multer.File,
  ): Promise<SeccionWeb> {
    const seccion = await this.findOne(id);
    let newImageUrl = seccion.imagen_url;

    // Si se proporciona un nuevo archivo, súbelo y borra el anterior.
    if (file) {
      try {
        newImageUrl = await this.uploadFile(file);
        if (seccion.imagen_url) {
          await this.deleteFileByUrl(seccion.imagen_url);
        }
      } catch (error) {
        console.error('Error al actualizar la imagen:', error);
        throw new InternalServerErrorException(
          'No se pudo actualizar la imagen.',
        );
      }
    }

    const updatedSeccion = this.seccionWebRepository.merge(seccion, {
      ...updateDto,
      imagen_url: newImageUrl,
    });

    return this.seccionWebRepository.save(updatedSeccion);
  }

  // --- NUEVO ENDPOINT: Eliminar ---
  async remove(id: number): Promise<{ message: string }> {
    const seccion = await this.findOne(id);

    try {
      // Borra la imagen de Firebase antes de borrar el registro de la BD.
      if (seccion.imagen_url) {
        await this.deleteFileByUrl(seccion.imagen_url);
      }

      await this.seccionWebRepository.remove(seccion);

      return { message: `La sección web con el ID ${id} ha sido eliminada.` };
    } catch (error) {
      console.error('Error al eliminar la sección web:', error);
      throw new InternalServerErrorException('No se pudo eliminar la sección.');
    }
  }

  private async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.firebaseService.getStorageBucket();

    // Crear un nombre de archivo único para evitar colisiones
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    const fileUpload = bucket.file(`secciones-web/${uniqueFileName}`);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', async () => {
        // Hacer el archivo público para poder acceder a la URL
        await fileUpload.makePublic();
        // Obtener la URL pública
        resolve(fileUpload.publicUrl());
      });

      stream.end(file.buffer);
    });
  }

  private async deleteFileByUrl(imageUrl: string): Promise<void> {
    try {
      // Extrae el nombre del archivo de la URL
      const fileName = imageUrl.split(this.bucket.name + '/')[1].split('?')[0];
      if (fileName) {
        await this.bucket.file(decodeURI(fileName)).delete();
      }
    } catch (error) {
      // Si el archivo no existe en Firebase, no lances un error, solo regístralo.
      console.warn(
        `No se pudo eliminar el archivo de Firebase o ya no existía: ${imageUrl}`,
        error.message,
      );
    }
  }
}
