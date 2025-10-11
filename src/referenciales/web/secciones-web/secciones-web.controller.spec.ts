import { Test, TestingModule } from '@nestjs/testing';
import { SeccionesWebController } from './secciones-web.controller';

describe('SeccionesWebController', () => {
  let controller: SeccionesWebController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeccionesWebController],
    }).compile();

    controller = module.get<SeccionesWebController>(SeccionesWebController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
