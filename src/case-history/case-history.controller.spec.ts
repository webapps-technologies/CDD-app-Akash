import { Test, TestingModule } from '@nestjs/testing';
import { CaseHistoryController } from './case-history.controller';
import { CaseHistoryService } from './case-history.service';

describe('CaseHistoryController', () => {
  let controller: CaseHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CaseHistoryController],
      providers: [CaseHistoryService],
    }).compile();

    controller = module.get<CaseHistoryController>(CaseHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
