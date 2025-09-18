/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductosSeguroService } from './productos_seguro.service';
import { ProductoSeguro } from './entities/producto_seguro.entity';
import { Aseguradora } from '../../../principales/aseguradora/entities/aseguradora.entity';
import { TipoSeguro } from '../../parametros/tipo-seguro/entities/tipo-seguro.entity';

describe('ProductosSeguroService', () => {
  let service: ProductosSeguroService;

  const mockProductoRepo = {};
  const mockAseguradoraRepo = {};
  const mockTipoDeSeguroRepo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductosSeguroService,
        {
          provide: getRepositoryToken(ProductoSeguro),
          useValue: mockProductoRepo,
        },
        {
          provide: getRepositoryToken(Aseguradora),
          useValue: mockAseguradoraRepo,
        },
        {
          provide: getRepositoryToken(TipoSeguro),
          useValue: mockTipoDeSeguroRepo,
        },
      ],
    }).compile();

    service = module.get<ProductosSeguroService>(ProductosSeguroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});