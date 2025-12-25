/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { ProductosSeguroController } from './productos_seguro.controller';
import { ProductosSeguroService } from './productos_seguro.service';

describe('ProductosSeguroController', () => {
  let controller: ProductosSeguroController;

  const mockProductosService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosSeguroController],
      providers: [
        {
          provide: ProductosSeguroService,
          useValue: mockProductosService,
        },
      ],
    }).compile();

    controller = module.get<ProductosSeguroController>(
      ProductosSeguroController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
