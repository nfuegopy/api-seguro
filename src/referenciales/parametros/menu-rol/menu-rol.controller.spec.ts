import { Test, TestingModule } from '@nestjs/testing';
import { MenuRolController } from './menu-rol.controller';
import { MenuRolService } from './menu-rol.service';

describe('MenuRolController', () => {
  let controller: MenuRolController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuRolController],
      providers: [MenuRolService],
    }).compile();

    controller = module.get<MenuRolController>(MenuRolController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
