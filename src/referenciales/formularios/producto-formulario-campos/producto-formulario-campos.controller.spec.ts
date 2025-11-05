import { Test, TestingModule } from '@nestjs/testing';
import { ProductoFormularioCamposController } from './producto-formulario-campos.controller';

describe('ProductoFormularioCamposController', () => {
  let controller: ProductoFormularioCamposController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductoFormularioCamposController],
    }).compile();

    controller = module.get<ProductoFormularioCamposController>(ProductoFormularioCamposController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
