import { Test, TestingModule } from '@nestjs/testing';
import { BasesCondicionesService } from './bases-condiciones.service';

describe('BasesCondicionesService', () => {
  let service: BasesCondicionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasesCondicionesService],
    }).compile();

    service = module.get<BasesCondicionesService>(BasesCondicionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
