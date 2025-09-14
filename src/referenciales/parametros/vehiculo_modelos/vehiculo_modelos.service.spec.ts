/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VehiculoModelosService } from './vehiculo_modelos.service';
import { VehiculoModelo } from './entities/vehiculo_modelo.entity';
import { VehiculoMarca } from '../vehiculo_marcas/entities/vehiculo_marca.entity';

describe('VehiculoModelosService', () => {
  let service: VehiculoModelosService;

  const mockModeloRepo = {};
  const mockMarcaRepo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiculoModelosService,
        {
          provide: getRepositoryToken(VehiculoModelo),
          useValue: mockModeloRepo,
        },
        {
          provide: getRepositoryToken(VehiculoMarca),
          useValue: mockMarcaRepo,
        },
      ],
    }).compile();

    service = module.get<VehiculoModelosService>(VehiculoModelosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
