import { Test, TestingModule } from '@nestjs/testing';
import { SeccionProductoPublicadoController } from './seccion-producto-publicado.controller';

describe('SeccionProductoPublicadoController', () => {
  let controller: SeccionProductoPublicadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeccionProductoPublicadoController],
    }).compile();

    controller = module.get<SeccionProductoPublicadoController>(
      SeccionProductoPublicadoController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
