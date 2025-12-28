/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Módulos base
import { RolesModule } from './referenciales/parametros/roles/roles.module';
import { TipoSeguroModule } from './referenciales/parametros/tipo-seguro/tipo-seguro.module';
import { PaisModule } from './referenciales/geograficos/pais/pais.module';
import { DepartamentoModule } from './referenciales/geograficos/departamento/departamento.module';
import { CiudadModule } from './referenciales/geograficos/ciudad/ciudad.module';
import { AseguradoraModule } from './principales/aseguradora/aseguradora.module';

// Módulos combinados de ambas ramas
import { TiposDocumentoModule } from './referenciales/parametros/tipos-documento/tipos-documento.module';
import { PersonasModule } from './gestion/personas/personas.module';
import { PersonaDocumentosModule } from './gestion/persona-documentos/persona-documentos.module';
import { UsuariosModule } from './gestion/usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { VehiculoMarcasModule } from './referenciales/parametros/vehiculo_marcas/vehiculo_marcas.module';
import { VehiculoModelosModule } from './referenciales/parametros/vehiculo_modelos/vehiculo_modelos.module';
import { ProductosSeguroModule } from './referenciales/parametros/productos_seguro/productos_seguro.module';
import { GrupoMenuModule } from './referenciales/parametros/grupo-menu/grupo-menu.module';
import { MenuModule } from './referenciales/parametros/menu/menu.module';
import { MenuRolModule } from './referenciales/parametros/menu-rol/menu-rol.module';
import { NivelesCoberturasModule } from './principales/niveles-coberturas/niveles-coberturas.module';
import { BasesCondicionesModule } from './referenciales/parametros/bases-condiciones/bases-condiciones.module';
import { PolizasModule } from './principales/polizas/polizas.module';
import { SeccionesWebModule } from './referenciales/web/secciones-web/secciones-web.module';

import { FirebaseModule } from './firebase/firebase.module';
import { NotificationsModule } from './common/notifications/notifications.module';

import { SeccionProductoPublicadoModule } from './referenciales/web/seccion-producto-publicado/seccion-producto-publicado.module';
import { CamposFormularioModule } from './referenciales/formularios/campos-formulario/campos-formulario.module';
import { ProductoFormularioCamposModule } from './referenciales/formularios/producto-formulario-campos/producto-formulario-campos.module';

//Nuevo import para cotizar
import { CotizacionesModule } from './principales/cotizaciones/cotizaciones.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

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
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),

    // Lista de módulos combinada y limpia
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
    GrupoMenuModule, // De la rama main
    MenuModule, // De la rama main
    MenuRolModule, // De la rama main
    VehiculoMarcasModule,
    VehiculoModelosModule,
    ProductosSeguroModule,
    NivelesCoberturasModule,
    BasesCondicionesModule,
    PolizasModule, // De la rama b1
    FirebaseModule,
    SeccionesWebModule,
    SeccionProductoPublicadoModule,
    CamposFormularioModule,
    ProductoFormularioCamposModule,
    CotizacionesModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
