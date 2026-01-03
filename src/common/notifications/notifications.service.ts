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
      this.logger.log('🔧 Notificaciones usando: SMTP (Nodemailer)');
    } else {
      this.emailProvider = this.firebaseProvider;
      this.logger.log('🔥 Notificaciones usando: FIREBASE');
    }
  }

  // Método actualizado con parámetro 'detalles'
  async sendCotizacionEmail(
    to: string,
    nombreCliente: string,
    plan: string,
    precio: string,
    detalles: any = {}, // Objeto opcional para evitar errores si no se pasa
  ) {
    const subject = `Tu Cotización: ${plan}`;

    // HTML Mejorado con Tabla de detalles
    const html = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <div style="background-color: #0056b3; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">¡Hola ${nombreCliente}!</h2>
        </div>

        <div style="padding: 20px;">
          <p style="font-size: 16px;">Gracias por cotizar con <strong>Gestor Seguro</strong>. Hemos analizado tus datos y tenemos la siguiente propuesta para ti:</p>

          <div style="background-color: #f8f9fa; border-left: 5px solid #0056b3; padding: 15px; margin: 20px 0;">
             <p style="margin: 5px 0; font-size: 14px; color: #666;">PLAN SELECCIONADO</p>
             <h3 style="margin: 0; color: #333;">${plan}</h3>
             <p style="margin: 15px 0 5px 0; font-size: 14px; color: #666;">INVERSIÓN ANUAL ESTIMADA</p>
             <h2 style="margin: 0; color: #28a745;">${precio}</h2>
          </div>

          <h4 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">Detalles del Vehículo Asegurado</h4>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Marca:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${detalles.marca || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Modelo:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${detalles.modelo || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Año:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${detalles.anio || '-'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666;">Matrícula:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">${detalles.matricula || '-'}</td>
            </tr>
          </table>

          <div style="text-align: center; margin-top: 30px;">
            <p>Si deseas contratar esta póliza, responde a este correo o contáctanos al WhatsApp.</p>
          </div>
        </div>

        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
          <p>Gestor Seguro - Asunción, Paraguay</p>
          <p>Este es un mensaje automático, por favor no responder si no desea el servicio.</p>
        </div>
      </div>
    `;

    return this.emailProvider.sendEmail(to, subject, html);
  }
}
