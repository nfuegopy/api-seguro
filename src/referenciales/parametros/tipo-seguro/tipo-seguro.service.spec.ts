/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoSeguro } from './entities/tipo-seguro.entity';
import { TipoSeguroService } from './tipo-seguro.service';

const mockTipoSeguroRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('TipoSeguroService', () => {
  let service: TipoSeguroService;
  let repository: Repository<TipoSeguro>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipoSeguroService,
        {
          provide: getRepositoryToken(TipoSeguro),
          useValue: mockTipoSeguroRepository,
        },
      ],
    }).compile();

    service = module.get<TipoSeguroService>(TipoSeguroService);
    repository = module.get<Repository<TipoSeguro>>(
      getRepositoryToken(TipoSeguro),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería retornar un arreglo de tipos de seguro', async () => {
      const tiposDeSeguroPrueba = [
        { id: 1, nombre: 'Seguro de Vida', descripcion: 'test' },
      ];
      mockTipoSeguroRepository.find.mockReturnValue(tiposDeSeguroPrueba);

      const resultado = await service.findAll();

      expect(resultado).toEqual(tiposDeSeguroPrueba);
      expect(mockTipoSeguroRepository.find).toHaveBeenCalled();
    });
  });
});
