// src/common/notifications/notifications.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEmailProvider } from './interfaces/email-provider.interface';
import { SmtpEmailProvider } from './providers/smtp-email.provider';

@Injectable()
export class NotificationsService {
  private emailProvider: IEmailProvider;
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly smtpProvider: SmtpEmailProvider,
  ) {
    this.initializeProvider();
  }

  private initializeProvider() {
    this.emailProvider = this.smtpProvider;
    this.logger.log('🔧 Notificaciones forzadas a: SMTP (Nodemailer)');
  }

  /**
   * Genera las filas HTML de la tabla dinámicamente.
   * Convierte cualquier objeto JSON en filas de tabla <tr>.
   */
  private generarFilasDetalle(detalles: Record<string, any>): string {
    if (!detalles || Object.keys(detalles).length === 0) {
      return '<tr><td colspan="2" style="padding: 8px; color: #999;">Sin detalles adicionales.</td></tr>';
    }

    let htmlRows = '';

    // Recorremos cada clave/valor del objeto detalles
    for (const [clave, valor] of Object.entries(detalles)) {
      // Si el valor es nulo o vacío, mostramos un guion
      const valorMostrar =
        valor !== null && valor !== undefined && valor !== '' ? valor : '-';

      // Capitalizamos la clave si viene en minúscula (ej: "marca" -> "Marca")
      // Nota: Si desde CotizacionesService ya envías las claves bonitas ("Valor Asegurado"), esto respeta eso.
      const etiqueta =
        clave.charAt(0).toUpperCase() + clave.slice(1).replace(/_/g, ' ');

      htmlRows += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666; width: 40%; vertical-align: top;">
            ${etiqueta}:
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">
            ${valorMostrar}
          </td>
        </tr>
      `;
    }

    return htmlRows;
  }

  async sendCotizacionEmail(
    to: string,
    nombreCliente: string,
    plan: string,
    precio: string,
    detalles: Record<string, any> = {},
  ) {
    const subject = `Tu Cotización: ${plan}`;

    // Generamos las filas antes de meterlas al HTML principal
    const filasDinamicas = this.generarFilasDetalle(detalles);

    const html = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        
        <div style="background-color: #0056b3; padding: 25px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px;">¡Hola ${nombreCliente}!</h2>
        </div>

        <div style="padding: 30px;">
          <p style="font-size: 16px; line-height: 1.5; color: #555;">
            Gracias por cotizar con <strong>Gestor Seguro</strong>. Hemos analizado tus datos y tenemos la siguiente propuesta personalizada para ti:
          </p>

          <div style="background-color: #f8f9fa; border-left: 5px solid #28a745; padding: 20px; margin: 25px 0; border-radius: 4px;">
             <p style="margin: 0 0 5px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">PLAN SELECCIONADO</p>
             <h3 style="margin: 0 0 15px 0; color: #0056b3; font-size: 22px;">${plan}</h3>
             
             <p style="margin: 0 0 5px 0; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">INVERSIÓN ANUAL ESTIMADA</p>
             <h2 style="margin: 0; color: #28a745; font-size: 32px;">${precio}</h2>
          </div>

          <h4 style="border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 30px; color: #333;">Detalles de la Cobertura</h4>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
            ${filasDinamicas} 
          </table>

          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 16px; margin-bottom: 20px;">¿Te interesa esta póliza?</p>
            <a href="#" style="background-color: #0056b3; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">Contactar por WhatsApp</a>
            <p style="font-size: 14px; color: #999; margin-top: 20px;">O responde directamente a este correo.</p>
          </div>
        </div>

        <div style="background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #e0e0e0;">
          <p style="margin: 5px 0;"><strong>Gestor Seguro</strong> - Asunción, Paraguay</p>
          <p style="margin: 5px 0;">Este es un presupuesto automático sujeto a inspección y aprobación final.</p>
        </div>
      </div>
    `;

    return this.emailProvider.sendEmail(to, subject, html);
  }
}
