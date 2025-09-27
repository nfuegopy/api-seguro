import { Test, TestingModule } from '@nestjs/testing';
import { NivelesCoberturaService } from './niveles-coberturas.service';

describe('NivelesCoberturaService', () => {
  let service: NivelesCoberturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NivelesCoberturaService],
    }).compile();

    service = module.get<NivelesCoberturaService>(NivelesCoberturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});