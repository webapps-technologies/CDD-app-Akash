import { Test, TestingModule } from '@nestjs/testing';
import { WhyChoseUsService } from './why-chose-us.service';

describe('WhyChoseUsService', () => {
  let service: WhyChoseUsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhyChoseUsService],
    }).compile();

    service = module.get<WhyChoseUsService>(WhyChoseUsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
