import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSeccionWebDto } from './dto/create-seccion-web.dto';
import { SeccionWeb } from './entities/seccion-web.entity'; // Asegúrate de crear esta entidad
import { FirebaseService } from 'src/firebase/firebase.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SeccionesWebService {
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

  // ... otros métodos del CRUD
}
