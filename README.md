# API Seguro

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

Este proyecto es una API desarrollada con el framework [NestJS](https://nestjs.com/) para gestionar datos relacionados con seguros. La estructura del proyecto está organizada en módulos para facilitar la escalabilidad y el mantenimiento.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) (incluido con Node.js)
- [MySQL](https://www.mysql.com/) (para la base de datos)

## Instalación

Clona el repositorio y navega al directorio del proyecto:

```bash
$ git clone https://github.com/nfuegopy/api-seguro.git
$ cd api-seguro
```

Instala las dependencias del proyecto:

```bash
$ npm install
```

Configura las variables de entorno en un archivo `.env` en la raíz del proyecto. Ejemplo:

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_contraseña
DB_DATABASE=api_seguro
API_KEY=tu_api_key_secreta
```

## Configuración del archivo .env

El archivo `.env` es crucial para configurar las variables de entorno necesarias para que la aplicación funcione correctamente. A continuación, se muestra un ejemplo de cómo debería estructurarse:

```properties
# .env

DB_HOST=tu_host_de_base_de_datos
DB_PORT=puerto_de_tu_base_de_datos
DB_USERNAME=tu_usuario_de_base_de_datos
DB_PASSWORD=tu_contraseña_de_base_de_datos
DB_DATABASE=nombre_de_tu_base_de_datos
API_KEY=tu_api_key_secreta
```

### Notas importantes:

- **DB_HOST:** Dirección del servidor de la base de datos.
- **DB_PORT:** Puerto en el que se encuentra la base de datos (por defecto, MySQL utiliza el puerto `3306`).
- **DB_USERNAME:** Usuario con permisos para acceder a la base de datos.
- **DB_PASSWORD:** Contraseña del usuario.
- **DB_DATABASE:** Nombre de la base de datos que utilizará la aplicación.
- **API_KEY:** Clave secreta utilizada para proteger los endpoints.

Asegúrate de no compartir este archivo ni su contenido en repositorios públicos para evitar problemas de seguridad.

## Scripts disponibles

### Levantar el servidor

- **Modo desarrollo:**

```bash
$ npm run start:dev
```

- **Modo producción:**

```bash
$ npm run start:prod
```

- **Modo estándar:**

```bash
$ npm run start
```

### Pruebas

- **Pruebas unitarias:**

```bash
$ npm run test
```

- **Pruebas end-to-end:**

```bash
$ npm run test:e2e
```

- **Cobertura de pruebas:**

```bash
$ npm run test:cov
```

## Estructura del proyecto

La estructura del proyecto está organizada de la siguiente manera:

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
├── common/
│   └── guards/
│       └── api-key.guard.ts
├── referenciales/
│   ├── geograficos/
│   │   ├── ciudad/
│   │   ├── departamento/
│   │   └── pais/
│   └── parametros/
│       ├── roles/
│       └── tipo-seguro/
└── test/
```

Cada módulo contiene controladores, servicios, entidades y DTOs para manejar la lógica de negocio y las operaciones relacionadas.

## Uso del ApiKeyGuard

El `ApiKeyGuard` es un guard que protege los endpoints mediante una clave secreta (API Key). Para utilizarlo, sigue estos pasos:

1. **Configura la API Key en el archivo `.env`:**

```properties
API_KEY=tu_api_key_secreta
```

2. **Aplica el guard a un controlador o endpoint específico:**

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from './common/guards/api-key.guard';

@Controller('protegido')
@UseGuards(ApiKeyGuard)
export class ProtegidoController {
  @Get()
  obtenerDatosProtegidos() {
    return { mensaje: 'Acceso autorizado a datos protegidos' };
  }
}
```

3. **Prueba el endpoint protegido:**
   - Usa una herramienta como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/).
   - Incluye el encabezado `X-API-KEY` con el valor de tu API Key.

Ejemplo de solicitud:

```
GET /protegido HTTP/1.1
Host: localhost:3000
X-API-KEY: tu_api_key_secreta
```

Si la API Key es válida, recibirás una respuesta exitosa. De lo contrario, obtendrás un error `401 Unauthorized`.

## Crear nuevos endpoints

Para agregar un nuevo módulo y sus endpoints, sigue estos pasos:

1. **Generar un módulo:**

```bash
$ nest g module <nombre-modulo>
```

2. **Generar un controlador:**

```bash
$ nest g controller <nombre-modulo>
```

3. **Generar un servicio:**

```bash
$ nest g service <nombre-modulo>
```

4. **Crear las entidades y DTOs:**
   - Define la entidad en `src/<nombre-modulo>/entities/`.
   - Define los DTOs en `src/<nombre-modulo>/dto/`.

5. **Configurar el módulo:**
   - Importa el módulo en `app.module.ts`.
   - Configura el repositorio en el servicio usando `@InjectRepository`.

6. **Agregar las rutas en el controlador:**
   - Define los métodos HTTP (`GET`, `POST`, `PATCH`, `DELETE`) y llama al servicio correspondiente.

7. **Probar los endpoints:**
   - Usa herramientas como [Postman](https://www.postman.com/) o [Insomnia](https://insomnia.rest/) para probar las rutas.

## Recursos adicionales

- [Documentación oficial de NestJS](https://docs.nestjs.com/)
- [Canal de Discord de NestJS](https://discord.gg/G7Qnnhy)
- [Cursos oficiales de NestJS](https://courses.nestjs.com/)

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).

---

## Creado por

Esta guía fue creada por **Antonio Barrios** como una referencia detallada para entender y trabajar con este proyecto. Si tienes alguna duda o sugerencia, no dudes en contribuir o ponerte en contacto.
