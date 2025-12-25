import { Test, TestingModule } from '@nestjs/testing';
import { CiudadService } from './ciudad.service';

describe('CiudadService', () => {
  let service: CiudadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiudadService],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
