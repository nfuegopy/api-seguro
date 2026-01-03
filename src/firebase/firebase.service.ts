/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';
import { ServiceAccount } from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
  private readonly logger = new Logger(FirebaseService.name); // Usamos Logger de Nest para mejores logs
  private storageBucket: Bucket;
  private firestore: admin.firestore.Firestore;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const bucketName = this.configService.get<string>(
      'FIREBASE_STORAGE_BUCKET',
    );
    const firebaseCredentials = this.configService.get<string>(
      'FIREBASE_CREDENTIALS',
    );

    if (!bucketName || !firebaseCredentials) {
      this.logger.error('Faltan variables de entorno FIREBASE_*');
      return; // Salimos suavemente en lugar de lanzar error
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const serviceAccount: ServiceAccount = JSON.parse(firebaseCredentials);

      if (!admin.apps.length) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          storageBucket: bucketName,
        });
      }

      this.storageBucket = admin.storage().bucket();
      this.firestore = admin.firestore();

      this.logger.log(
        `✅ Firebase Admin SDK inicializado (Bucket: ${bucketName})`,
      );

      // --- VERIFICACIÓN DE CONEXIÓN NO BLOQUEANTE ---
      // Si falla por región (403) u otro motivo, SOLO avisamos, NO matamos la app.
      try {
        const [exists] = await this.storageBucket.exists();
        if (exists) {
          this.logger.log(`✅ Conexión con Storage verificada exitosamente.`);
        } else {
          this.logger.warn(
            `⚠️ El bucket '${bucketName}' no parece existir, pero la app continuará.`,
          );
        }
      } catch (bucketError) {
        this.logger.warn(
          `⚠️ ADVERTENCIA: No se pudo verificar el Bucket (Posible bloqueo de región). La app continuará, pero la subida de archivos podría fallar. Error: ${bucketError.message}`,
        );
        // IMPORTANTE: Aquí NO hacemos 'throw bucketError', así la app sigue viva.
      }
    } catch (error) {
      // Error general de inicialización (JSON mal formado, etc.)
      this.logger.error(`❌ Error inicializando Firebase: ${error.message}`);
      // Incluso aquí podriamos no lanzar error si quieres que la app viva sin Firebase
    }
  }

  getStorageBucket(): Bucket {
    return this.storageBucket;
  }

  getFirestoreInstance(): admin.firestore.Firestore {
    return this.firestore;
  }
}
