import { Test, TestingModule } from '@nestjs/testing';
import { WhyChoseUsController } from './why-chose-us.controller';
import { WhyChoseUsService } from './why-chose-us.service';

describe('WhyChoseUsController', () => {
  let controller: WhyChoseUsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhyChoseUsController],
      providers: [WhyChoseUsService],
    }).compile();

    controller = module.get<WhyChoseUsController>(WhyChoseUsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
