import { Test, TestingModule } from '@nestjs/testing';
import { NewsUpdatesController } from './news-updates.controller';
import { NewsUpdatesService } from './news-updates.service';

describe('NewsUpdatesController', () => {
  let controller: NewsUpdatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsUpdatesController],
      providers: [NewsUpdatesService],
    }).compile();

    controller = module.get<NewsUpdatesController>(NewsUpdatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
