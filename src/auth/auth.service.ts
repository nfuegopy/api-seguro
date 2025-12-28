/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/gestion/usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/gestion/usuarios/entities/usuario.entity';

type ValidatedUser = Omit<Usuario, 'password' | 'hashPassword'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<ValidatedUser | null> {
    const user = await this.usuariosService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      // Ignoramos 'password' explícitamente para que ESLint no se queje
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result as ValidatedUser;
    }
    return null;
  }

  login(user: ValidatedUser) {
    const payload = {
      sub: user.id,
      email: user.email,
      rol: user.rol,
      nombre: user.persona.nombre,
      apellido: user.persona.apellido,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        nombre: user.persona.nombre,
        apellido: user.persona.apellido,
        rol: user.rol,
      },
    };
  }
}
