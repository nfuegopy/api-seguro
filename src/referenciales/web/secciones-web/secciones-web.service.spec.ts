import { Test, TestingModule } from '@nestjs/testing';
import { SeccionesWebService } from './secciones-web.service';

describe('SeccionesWebService', () => {
  let service: SeccionesWebService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeccionesWebService],
    }).compile();

    service = module.get<SeccionesWebService>(SeccionesWebService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
