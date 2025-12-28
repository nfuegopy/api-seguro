import { Test, TestingModule } from '@nestjs/testing';
import { TipoSeguroController } from './tipo-seguro.controller';
import { TipoSeguroService } from './tipo-seguro.service';

describe('TipoSeguroController', () => {
  let controller: TipoSeguroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoSeguroController],
      providers: [TipoSeguroService],
    }).compile();

    controller = module.get<TipoSeguroController>(TipoSeguroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
