import { Test, TestingModule } from '@nestjs/testing';
import { SeccionProductoPublicadoService } from './seccion-producto-publicado.service';

describe('SeccionProductoPublicadoService', () => {
  let service: SeccionProductoPublicadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeccionProductoPublicadoService],
    }).compile();

    service = module.get<SeccionProductoPublicadoService>(SeccionProductoPublicadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
