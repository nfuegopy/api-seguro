/* eslint-disable prettier/prettier */
import { Module, Global } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { FirebaseEmailProvider } from './providers/firebase-email.provider';
import { SmtpEmailProvider } from './providers/smtp-email.provider';
import { FirebaseModule } from '../../firebase/firebase.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Global()
@Module({
  imports: [
    FirebaseModule,
    ConfigModule,
    // Dejamos configurado el MailerModule aunque no lo usemos activamente aún
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST') || 'smtp.example.com', // Fallback para evitar error al iniciar
          port: 587,
          secure: false,
          auth: {
            user: 'user',
            pass: 'pass',
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [NotificationsService, FirebaseEmailProvider, SmtpEmailProvider],
  exports: [NotificationsService],
})
export class NotificationsModule {}
