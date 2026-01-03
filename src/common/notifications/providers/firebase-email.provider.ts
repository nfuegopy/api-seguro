import { Injectable, Logger } from '@nestjs/common';
import { IEmailProvider } from '../interfaces/email-provider.interface';
import { FirebaseService } from '../../../firebase/firebase.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseEmailProvider implements IEmailProvider {
  private readonly logger = new Logger(FirebaseEmailProvider.name);
  private collectionName: string;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly configService: ConfigService,
  ) {
    this.collectionName = this.configService.get(
      'FIREBASE_EMAIL_COLLECTION',
      'mail',
    );
  }

  async sendEmail(
    to: string,
    subject: string,
    htmlBody: string,
  ): Promise<void> {
    try {
      const firestore = this.firebaseService.getFirestoreInstance();

      // Creamos el documento que la extensión de Firebase leerá para enviar el correo
      await firestore.collection(this.collectionName).add({
        to: [to],
        message: {
          subject: subject,
          html: htmlBody,
        },
        delivery: {
          state: 'PENDING', // Estado inicial
        },
        createdAt: new Date(),
        metadata: { source: 'API NestJS' },
      });

      this.logger.log(
        `📧 [FIREBASE] Correo encolado en colección '${this.collectionName}' para: ${to}`,
      );
    } catch (error) {
      this.logger.error(
        `❌ Error escribiendo email en Firebase: ${error.message}`,
      );
      throw error;
    }
  }
}
