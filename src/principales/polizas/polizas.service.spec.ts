import { Test, TestingModule } from '@nestjs/testing';
import { PolizasService } from './polizas.service';

describe('PolizasService', () => {
  let service: PolizasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolizasService],
    }).compile();

    service = module.get<PolizasService>(PolizasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
