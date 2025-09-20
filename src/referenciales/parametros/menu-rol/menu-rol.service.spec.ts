import { Test, TestingModule } from '@nestjs/testing';
import { MenuRolService } from './menu-rol.service';

describe('MenuRolService', () => {
  let service: MenuRolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuRolService],
    }).compile();

    service = module.get<MenuRolService>(MenuRolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
