import { Test, TestingModule } from '@nestjs/testing';
import { TiposDocumentoService } from './tipos-documento.service';

describe('TiposDocumentoService', () => {
  let service: TiposDocumentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TiposDocumentoService],
    }).compile();

    service = module.get<TiposDocumentoService>(TiposDocumentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
