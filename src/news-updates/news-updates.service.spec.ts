import { Test, TestingModule } from '@nestjs/testing';
import { NewsUpdatesService } from './news-updates.service';

describe('NewsUpdatesService', () => {
  let service: NewsUpdatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsUpdatesService],
    }).compile();

    service = module.get<NewsUpdatesService>(NewsUpdatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
