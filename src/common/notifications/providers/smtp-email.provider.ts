import { Injectable, Logger } from '@nestjs/common';
import { IEmailProvider } from '../interfaces/email-provider.interface';
// import { MailerService } from '@nestjs-modules/mailer'; // Descomentar cuando se active SMTP

@Injectable()
export class SmtpEmailProvider implements IEmailProvider {
  private readonly logger = new Logger(SmtpEmailProvider.name);

  // constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    htmlBody: string,
  ): Promise<void> {
    this.logger.warn(
      `⚠️ [SMTP] Intento de envío a ${to}. Funcionalidad SMTP está desactivada en código.`,
    );

    /* // --- LÓGICA FUTURA PARA ACTIVAR ---
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        html: htmlBody,
      });
      this.logger.log(`📧 [SMTP] Enviado correctamente a ${to}`);
    } catch (e) {
      this.logger.error(`Error SMTP: ${e.message}`);
      throw e;
    }
    */
    return Promise.resolve();
  }
}
