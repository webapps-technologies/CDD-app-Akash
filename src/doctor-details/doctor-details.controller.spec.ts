import { Test, TestingModule } from '@nestjs/testing';
import { DoctorDetailsController } from './doctor-details.controller';
import { DoctorDetailsService } from './doctor-details.service';

describe('DoctorDetailsController', () => {
  let controller: DoctorDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctorDetailsController],
      providers: [DoctorDetailsService],
    }).compile();

    controller = module.get<DoctorDetailsController>(DoctorDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
