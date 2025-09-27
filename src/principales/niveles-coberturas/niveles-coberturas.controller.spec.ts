import { Test, TestingModule } from '@nestjs/testing';
import { NivelesCoberturasController } from './niveles-coberturas.controller';

describe('NivelesCoberturasController', () => {
  let controller: NivelesCoberturasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelesCoberturasController],
    }).compile();

    controller = module.get<NivelesCoberturasController>(NivelesCoberturasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});