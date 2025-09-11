import { Test, TestingModule } from '@nestjs/testing';
import { PersonaDocumentosService } from './persona-documentos.service';

describe('PersonaDocumentosService', () => {
  let service: PersonaDocumentosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonaDocumentosService],
    }).compile();

    service = module.get<PersonaDocumentosService>(PersonaDocumentosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
