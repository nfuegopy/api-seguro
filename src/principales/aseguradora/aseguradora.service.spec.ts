import { Test, TestingModule } from '@nestjs/testing';
import { AseguradoraService } from './aseguradora.service';

describe('AseguradoraService', () => {
  let service: AseguradoraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AseguradoraService],
    }).compile();

    service = module.get<AseguradoraService>(AseguradoraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
