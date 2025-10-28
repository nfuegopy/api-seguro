import { Test, TestingModule } from '@nestjs/testing';
import { CamposFormularioService } from './campos-formulario.service';

describe('CamposFormularioService', () => {
  let service: CamposFormularioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamposFormularioService],
    }).compile();

    service = module.get<CamposFormularioService>(CamposFormularioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
