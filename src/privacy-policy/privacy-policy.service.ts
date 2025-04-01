import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DefaultStatus } from 'src/enum';
import { PrivacyPolicy } from './entities/privacy-policy.entity';
import { PaginationDto, privacypolicyDto } from './dto/privacy-policy.dto';
import { Like, Repository } from 'typeorm';
import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';
import { title } from 'process';

@Injectable()
export class PrivacyPolicyService {
  constructor(
    @InjectRepository(PrivacyPolicy)
    private readonly privacypolicyrepo: Repository<PrivacyPolicy>,
  ) {}

  async create(dto: privacypolicyDto) {
    const result = await this.privacypolicyrepo.findOne({
      where: { title: dto.title, content: dto.content },
    });
    if (result) {
      throw new ConflictException('Privacy-Policyalready exists!');
    }
    const obj = Object.assign(dto);
    return this.privacypolicyrepo.save(obj);
  }

  async find(dto: PaginationDto) {
    const keyword = dto.keyword || '';
    const [result, total] = await this.privacypolicyrepo.findAndCount({
      where: {
        title: Like('%' + keyword + '%'),
        content: Like('%' + keyword + '%'),
        status: DefaultStatus.ACTIVE,
      },
      take: dto.limit,
      skip: dto.offset,
    });
    return { result, total };
  }
  async findAll(dto: DefaultStatusPaginationDto) {
    const keyword = dto.keyword || '';
    const [result, total] = await this.privacypolicyrepo.findAndCount({
      where: {
        title: Like('%' + keyword + '%'),
        content: Like('%' + keyword + '%'),
        status: dto.status,
      },
      take: dto.limit,
      skip: dto.offset,
    });
    return { result, total };
  }

  async update(id: string, dto: privacypolicyDto) {
    const result = await this.privacypolicyrepo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Privacy-Policy not found!');
    }
    const obj = Object.assign(result, dto);
    return this.privacypolicyrepo.save(obj);
  }

  async status(id: string, dto: DefaultStatus) {
    const result = await this.privacypolicyrepo.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Privacy-Policy not found!');
    }
    const obj = Object.assign(result, dto);
    return this.privacypolicyrepo.save(obj);
  }
}
