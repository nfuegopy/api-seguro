import { Test, TestingModule } from '@nestjs/testing';
import { PolizasController } from './polizas.controller';

describe('PolizasController', () => {
  let controller: PolizasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolizasController],
    }).compile();

    controller = module.get<PolizasController>(PolizasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
