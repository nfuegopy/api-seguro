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
    this.logger.log('🔧 Notificaciones usando: SMTP (Nodemailer)');
  }

  // --- HELPER PARA GENERAR TABLA DINÁMICA ---
  private generarFilasDetalle(detalles: Record<string, any>): string {
    if (!detalles || Object.keys(detalles).length === 0) {
      return '<tr><td colspan="2" style="padding: 8px; color: #999;">Sin detalles adicionales.</td></tr>';
    }

    let htmlRows = '';

    for (const [clave, valor] of Object.entries(detalles)) {
      // Si el valor es nulo o vacío, mostramos un guion
      const valorMostrar =
        valor !== null && valor !== undefined && valor !== '' ? valor : '-';

      // Convertimos claves técnicas a texto bonito (ej: "valor_asegurado" -> "Valor Asegurado")
      // Solo si la clave no viene ya formateada con espacios
      let etiqueta = clave;
      if (!clave.includes(' ')) {
        etiqueta =
          clave.charAt(0).toUpperCase() + clave.slice(1).replace(/_/g, ' ');
      }

      htmlRows += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #666; width: 40%; vertical-align: top;">
            <strong>${etiqueta}:</strong>
          </td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">
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

    // Aquí generamos las filas automáticas
    const filasDinamicas = this.generarFilasDetalle(detalles);

    const html = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <div style="background-color: #0056b3; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">¡Hola ${nombreCliente}!</h2>
        </div>

        <div style="padding: 20px;">
          <p>Gracias por cotizar con <strong>Gestor Seguro</strong>. Aquí tienes tu propuesta:</p>

          <div style="background-color: #f8f9fa; border-left: 5px solid #28a745; padding: 15px; margin: 20px 0;">
             <p style="margin: 0; font-size: 12px; color: #888;">PLAN SELECCIONADO</p>
             <h3 style="margin: 5px 0 15px 0; color: #0056b3;">${plan}</h3>
             
             <p style="margin: 0; font-size: 12px; color: #888;">INVERSIÓN ANUAL ESTIMADA</p>
             <h2 style="margin: 5px 0 0 0; color: #28a745;">${precio}</h2>
          </div>

          <h4 style="border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 20px;">Detalles del Vehículo</h4>
          
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            ${filasDinamicas} </table>

          <div style="text-align: center; margin-top: 30px;">
            <p>Si deseas contratar, responde a este correo.</p>
          </div>
        </div>

        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #888;">
          <p>Gestor Seguro - Asunción, Paraguay</p>
        </div>
      </div>
    `;

    return this.emailProvider.sendEmail(to, subject, html);
  }
}
