import { Module } from '@nestjs/common';
import { CamposFormularioController } from './campos-formulario.controller';
import { CamposFormularioService } from './campos-formulario.service';

@Module({
  controllers: [CamposFormularioController],
  providers: [CamposFormularioService]
})
export class CamposFormularioModule {}
