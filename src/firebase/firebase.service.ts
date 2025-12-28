/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private storageBucket: Bucket;
  private firestore: admin.firestore.Firestore; // <--- NUEVO: Propiedad para Firestore

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    // Leer las credenciales y el bucket desde la configuración
    const bucketName = this.configService.get<string>(
      'FIREBASE_STORAGE_BUCKET',
    );
    const firebaseCredentials = this.configService.get<string>(
      'FIREBASE_CREDENTIALS',
    );

    // Comprobar que las variables de entorno cruciales existan
    if (!bucketName || !firebaseCredentials) {
      throw new Error(
        'Variables de entorno de Firebase FIREBASE_STORAGE_BUCKET y FIREBASE_CREDENTIALS deben estar definidas.',
      );
    }

    // Parsear las credenciales que vienen como texto desde el .env
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const serviceAccount: ServiceAccount = JSON.parse(firebaseCredentials);

    // Inicializar la app de Firebase si no se ha hecho antes
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: bucketName,
      });
    }

    this.storageBucket = admin.storage().bucket();
    this.firestore = admin.firestore(); // <--- NUEVO: Inicializamos Firestore

    console.log(
      'Firebase Admin SDK inicializado correctamente para el bucket:',
      bucketName,
    );

    // --- MEJORA: Verificar la existencia del bucket al arrancar ---
    try {
      const [exists] = await this.storageBucket.exists();
      if (!exists) {
        throw new Error(
          `El bucket de Firebase '${bucketName}' no existe o no es accesible.`,
        );
      }
      console.log(
        `Conexión con el bucket '${bucketName}' verificada exitosamente.`,
      );
    } catch (error) {
      console.error(
        'Error crítico al verificar la existencia del bucket de Firebase:',
        error.message,
      );
      // Lanzar el error detendrá el arranque de la aplicación si el bucket no es válido
      throw error;
    }
  }

  // --- RESTAURADO: Tu método original para imágenes ---
  getStorageBucket(): Bucket {
    return this.storageBucket;
  }

  // --- NUEVO: Método para correos/notificaciones ---
  getFirestoreInstance(): admin.firestore.Firestore {
    return this.firestore;
  }
}
