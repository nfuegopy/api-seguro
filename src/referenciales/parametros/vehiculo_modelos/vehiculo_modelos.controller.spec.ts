/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { VehiculoModelosController } from './vehiculo_modelos.controller';
import { VehiculoModelosService } from './vehiculo_modelos.service';

describe('VehiculoModelosController', () => {
  let controller: VehiculoModelosController;

  const mockModelosService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiculoModelosController],
      providers: [
        {
          provide: VehiculoModelosService,
          useValue: mockModelosService,
        },
      ],
    }).compile();

    controller = module.get<VehiculoModelosController>(VehiculoModelosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
