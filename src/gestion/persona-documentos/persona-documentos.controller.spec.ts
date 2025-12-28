import { Test, TestingModule } from '@nestjs/testing';
import { PersonaDocumentosController } from './persona-documentos.controller';
import { PersonaDocumentosService } from './persona-documentos.service';

describe('PersonaDocumentosController', () => {
  let controller: PersonaDocumentosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonaDocumentosController],
      providers: [PersonaDocumentosService],
    }).compile();

    controller = module.get<PersonaDocumentosController>(
      PersonaDocumentosController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
