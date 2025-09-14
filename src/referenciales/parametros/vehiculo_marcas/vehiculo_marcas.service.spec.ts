/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculoMarcasService } from './vehiculo_marcas.service';
import { VehiculoMarca } from './entities/vehiculo_marca.entity';

const mockVehiculoMarcaRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  merge: jest.fn(),
};

describe('VehiculoMarcasService', () => {
  let service: VehiculoMarcasService;
  let repository: Repository<VehiculoMarca>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehiculoMarcasService,
        {
          provide: getRepositoryToken(VehiculoMarca),
          useValue: mockVehiculoMarcaRepository,
        },
      ],
    }).compile();

    service = module.get<VehiculoMarcasService>(VehiculoMarcasService);
    repository = module.get<Repository<VehiculoMarca>>(
      getRepositoryToken(VehiculoMarca),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('debería retornar un arreglo de marcas de vehículo', async () => {
      const marcasDePrueba = [{ id: 1, nombre: 'Toyota' }];
      mockVehiculoMarcaRepository.find.mockReturnValue(marcasDePrueba);

      const resultado = await service.findAll();

      expect(resultado).toEqual(marcasDePrueba);
      expect(mockVehiculoMarcaRepository.find).toHaveBeenCalled();
    });
  });
});