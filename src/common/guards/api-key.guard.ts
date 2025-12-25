/* eslint-disable prettier/prettier */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Request } from 'express'; // <-- IMPORTA el tipo 'Request' de express

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Le damos el tipo <Request> para que TypeScript sepa qué métodos están disponibles
    const request = context.switchToHttp().getRequest<Request>();

    const apiKeyHeader = request.header('X-API-KEY'); // Ahora el acceso es seguro
    const validApiKey = this.configService.get<string>('API_KEY');

    if (apiKeyHeader !== validApiKey) {
      throw new UnauthorizedException(
        'Acceso no autorizado: API Key inválida.',
      );
    }

    return true;
  }
}
