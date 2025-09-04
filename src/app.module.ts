/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Importa aquí los módulos que generaste (NestJS puede haberlo hecho ya)
import { RolesModule } from './referenciales/parametros/roles/roles.module';
import { TipoSeguroModule } from './referenciales/parametros/tipo-seguro/tipo-seguro.module';
import { PaisModule } from './referenciales/geograficos/pais/pais.module';
import { DepartamentoModule } from './referenciales/geograficos/departamento/departamento.module';
import { CiudadModule } from './referenciales/geograficos/ciudad/ciudad.module';

@Module({
  imports: [
    // 1. Carga las variables de entorno de forma global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // 2. Configura la conexión a la base de datos
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        // Detecta automáticamente las entidades (.entity.ts)
        autoLoadEntities: true,
        // Sincroniza el esquema de la BD (SOLO para desarrollo)
        synchronize: true,
      }),
    }),

    // 3. Tus módulos de negocio
    RolesModule,
    TipoSeguroModule,
    PaisModule,
    DepartamentoModule,
    CiudadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
