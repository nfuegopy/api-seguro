import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEmailProvider } from './interfaces/email-provider.interface';
import { FirebaseEmailProvider } from './providers/firebase-email.provider';
import { SmtpEmailProvider } from './providers/smtp-email.provider';

@Injectable()
export class NotificationsService {
  private emailProvider: IEmailProvider;
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly firebaseProvider: FirebaseEmailProvider,
    private readonly smtpProvider: SmtpEmailProvider,
  ) {
    this.initializeProvider();
  }

  private initializeProvider() {
    const providerEnv = this.configService.get<string>(
      'NOTIFICATION_EMAIL_PROVIDER',
      'firebase',
    );

    if (providerEnv === 'smtp') {
      this.emailProvider = this.smtpProvider;
      this.logger.log('🔧 Notificaciones usando: SMTP');
    } else {
      this.emailProvider = this.firebaseProvider;
      this.logger.log('🔥 Notificaciones usando: FIREBASE');
    }
  }

  // Método específico para cotizaciones (Plantilla simple)
  async sendCotizacionEmail(
    to: string,
    nombreCliente: string,
    plan: string,
    precio: string,
  ) {
    const subject = `Tu Cotización: ${plan}`;

    // Aquí puedes mejorar el HTML tanto como quieras
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #0056b3;">Hola ${nombreCliente},</h2>
        <p>Gracias por confiar en nosotros. Aquí tienes el detalle de tu cotización:</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
          <p><strong>Plan:</strong> ${plan}</p>
          <p><strong>Precio Estimado:</strong> <span style="font-size: 1.2em; font-weight: bold;">${precio} Gs.</span></p>
        </div>
        <p>Si deseas contratar, por favor responde a este correo.</p>
        <hr>
        <p style="font-size: 0.8em; color: #777;">Este es un mensaje automático.</p>
      </div>
    `;

    return this.emailProvider.sendEmail(to, subject, html);
  }
}
