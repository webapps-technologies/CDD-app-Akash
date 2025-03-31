import { Test, TestingModule } from '@nestjs/testing';
import { DoctorDetailsService } from './doctor-details.service';

describe('DoctorDetailsService', () => {
  let service: DoctorDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctorDetailsService],
    }).compile();

    service = module.get<DoctorDetailsService>(DoctorDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
