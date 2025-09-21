import { Test, TestingModule } from '@nestjs/testing';
import { BasesCondicionesController } from './bases-condiciones.controller';

describe('BasesCondicionesController', () => {
  let controller: BasesCondicionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasesCondicionesController],
    }).compile();

    controller = module.get<BasesCondicionesController>(BasesCondicionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
