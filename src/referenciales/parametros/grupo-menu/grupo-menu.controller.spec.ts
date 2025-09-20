import { Test, TestingModule } from '@nestjs/testing';
import { GrupoMenuController } from './grupo-menu.controller';
import { GrupoMenuService } from './grupo-menu.service';

describe('GrupoMenuController', () => {
  let controller: GrupoMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrupoMenuController],
      providers: [GrupoMenuService],
    }).compile();

    controller = module.get<GrupoMenuController>(GrupoMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
