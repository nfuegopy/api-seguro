import { Test, TestingModule } from '@nestjs/testing';
import { AseguradoraController } from './aseguradora.controller';

describe('AseguradoraController', () => {
  let controller: AseguradoraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AseguradoraController],
    }).compile();

    controller = module.get<AseguradoraController>(AseguradoraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
