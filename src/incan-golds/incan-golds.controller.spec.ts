import { Test, TestingModule } from '@nestjs/testing';
import { IncanGoldsController } from './incan-golds.controller';

describe('IncanGoldsController', () => {
  let controller: IncanGoldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncanGoldsController],
    }).compile();

    controller = module.get<IncanGoldsController>(IncanGoldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
