/* eslint-disable prettier/prettier */

import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsuarioDto } from 'src/gestion/usuarios/dto/create-usuario.dto';
import { UsuariosService } from 'src/gestion/usuarios/usuarios.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
// La palabra 'export' es crucial para que otros archivos puedan importar esta clase.
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() createUsuarioDto: CreateUsuarioDto) {
    const user = await this.usuariosService.create(createUsuarioDto);
    return {
      message: 'Usuario registrado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
    };
  }
}
