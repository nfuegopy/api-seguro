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
import { AseguradoraModule } from './principales/aseguradora/aseguradora.module';
import { TiposDocumentoModule } from './referenciales/parametros/tipos-documento/tipos-documento.module';
import { PersonasModule } from './gestion/personas/personas.module';
import { PersonaDocumentosModule } from './gestion/persona-documentos/persona-documentos.module';
import { UsuariosModule } from './gestion/usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { VehiculoMarcasModule } from './referenciales/parametros/vehiculo_marcas/vehiculo_marcas.module';
import { VehiculoModelosModule } from './referenciales/parametros/vehiculo_modelos/vehiculo_modelos.module';
import { ProductosSeguroModule } from './referenciales/parametros/productos_seguro/productos_seguro.module';

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
    AseguradoraModule,
    TiposDocumentoModule,
    PersonasModule,
    PersonaDocumentosModule,
    UsuariosModule,
    AuthModule,
    VehiculoMarcasModule,
    VehiculoModelosModule,
    ProductosSeguroModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
