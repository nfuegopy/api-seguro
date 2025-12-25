import { Test, TestingModule } from '@nestjs/testing';
import { CiudadController } from './ciudad.controller';
import { CiudadService } from './ciudad.service';

describe('CiudadController', () => {
  let controller: CiudadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CiudadController],
      providers: [CiudadService],
    }).compile();

    controller = module.get<CiudadController>(CiudadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
