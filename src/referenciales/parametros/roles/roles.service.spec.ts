/* eslint-disable prettier/prettier */
// src/referenciales/parametros/roles/roles.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

// Creamos un objeto que simula ser el Repositorio de TypeORM
const mockRolesRepository = {
  find: jest.fn(),
  // Aquí podríamos añadir mocks para .findOne(), .create(), .save(), etc.
};

describe('RolesService', () => {
  let service: RolesService;
  let repository: Repository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role), // Este es el token de inyección
          useValue: mockRolesRepository, // Usamos nuestro simulador en lugar del real
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    repository = module.get<Repository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- PRUEBA PARA EL MÉTODO findAll ---
  describe('findAll', () => {
    it('debería retornar un arreglo de roles', async () => {
      // 1. Arrange (Preparar)
      const rolesDePrueba = [{ id: 1, nombre: 'Admin', descripcion: 'test' }];
      // Le decimos a nuestro mock que cuando se llame a la función `find`, devuelva nuestros datos de prueba
      mockRolesRepository.find.mockReturnValue(rolesDePrueba);

      // 2. Act (Actuar)
      const resultado = await service.findAll();

      // 3. Assert (Verificar)
      expect(resultado).toEqual(rolesDePrueba); // El resultado debe ser igual a nuestros datos
      expect(mockRolesRepository.find).toHaveBeenCalled(); // Verificamos que la función find del repo fue llamada
    });
  });

  // --- AQUÍ AÑADIRÍAMOS MÁS PRUEBAS PARA create, findOne, update y remove ---
});
