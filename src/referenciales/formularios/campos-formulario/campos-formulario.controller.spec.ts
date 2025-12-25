import { Test, TestingModule } from '@nestjs/testing';
import { CamposFormularioController } from './campos-formulario.controller';

describe('CamposFormularioController', () => {
  let controller: CamposFormularioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CamposFormularioController],
    }).compile();

    controller = module.get<CamposFormularioController>(
      CamposFormularioController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
