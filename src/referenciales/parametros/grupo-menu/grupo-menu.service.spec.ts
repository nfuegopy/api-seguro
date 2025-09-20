import { Test, TestingModule } from '@nestjs/testing';
import { GrupoMenuService } from './grupo-menu.service';

describe('GrupoMenuService', () => {
  let service: GrupoMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrupoMenuService],
    }).compile();

    service = module.get<GrupoMenuService>(GrupoMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
