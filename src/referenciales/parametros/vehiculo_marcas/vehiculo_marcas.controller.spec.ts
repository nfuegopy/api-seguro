/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { VehiculoMarcasController } from './vehiculo_marcas.controller';
import { VehiculoMarcasService } from './vehiculo_marcas.service';

// Mock del servicio para aislar el controlador en las pruebas
const mockVehiculoMarcasService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('VehiculoMarcasController', () => {
  let controller: VehiculoMarcasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiculoMarcasController],
      providers: [
        {
          provide: VehiculoMarcasService,
          useValue: mockVehiculoMarcasService,
        },
      ],
    }).compile();

    controller = module.get<VehiculoMarcasController>(VehiculoMarcasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});