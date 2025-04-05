import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseHistoryDto } from './dto/create-case-history.dto';
import { UpdateCaseHistoryDto } from './dto/update-case-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { privateDecrypt } from 'crypto';
import { DoctorDetail } from 'src/doctor-details/entities/doctor-detail.entity';
import { Repository } from 'typeorm';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { CaseHistory } from './entities/case-history.entity';
import { UserGender } from 'src/enum';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';

@Injectable()
export class CaseHistoryService {
  constructor(
    @InjectRepository(DoctorDetail)
    private readonly doctorrepo: Repository<DoctorDetail>,
    @InjectRepository(UserDetail)
    private readonly userrepo: Repository<UserDetail>,
    @InjectRepository(CaseHistory)
    private readonly casehistoryrepo: Repository<CaseHistory>,
  ) {}
  async createCaseHistory(dto: CreateCaseHistoryDto) {
    const doctorDetail = await this.doctorrepo.findOne({
      where: { accountId: dto.doctorId },
    });
    const userDetail = await this.userrepo.findOne({
      where: { accountId: dto.userId },
    });

    if (!doctorDetail || !userDetail) {
      throw new Error('Doctor or User not found');
    }
    const caseHistory = this.casehistoryrepo.create({
      doctorId: doctorDetail.accountId,
      DoctorName: doctorDetail.name,
      userId: userDetail.id,
      UserName: userDetail.name,
      UserAge: userDetail.age,
      UserGender: userDetail.gender,
      diagnosis: dto.diagnosis,
      prescription: dto.prescription,
    });

    return await this.casehistoryrepo.save(caseHistory);
  }

  async findAll(dto: CommonPaginationDto) {
    const queryBuilder = this.casehistoryrepo.createQueryBuilder('caseHistory');
    queryBuilder.take(dto.limit).skip(dto.offset);

    const [result, count] = await queryBuilder.getManyAndCount();

    return { result, count };
  }

  async getCaseHistoriesByDoctor(doctorId: string) {
    const [result,total] = await this.casehistoryrepo
      .createQueryBuilder('caseHistory')
      .where('caseHistory.doctorId = :doctorId', { doctorId })
      .getManyAndCount();
    if (!result) {
      throw new NotFoundException('case history not found!');
    }
    return { result, total };
  }
}
