import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { TermsPolicy } from './entities/terms-policy.entity';
import { Like, Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { PaginationDto, TermsPolicyDto } from './dto/terms-policy.dto';
import { DefaultStatus } from 'src/enum';
import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';

@Injectable()
export class TermsPolicyService {
  constructor(
    @InjectRepository(TermsPolicy)
    private readonly termsPolicyRepository: Repository<TermsPolicy>,
  ) {}
  async create(dto: TermsPolicyDto) {
    const result = await this.termsPolicyRepository.findOne({
      where: { terms: dto.terms },
    });
    if (result) {
      throw new ConflictException('terms already exists!');
    }
    const obj = Object.assign(dto);
    return this.termsPolicyRepository.save(obj);
  }

  async find(dto: PaginationDto) {
    const keyword = dto.keyword || '';
    const [result, total] = await this.termsPolicyRepository.findAndCount({
      where: {
        terms: Like('%' + keyword + '%'),
        privacy_policy: Like('%' + keyword + '%'),
        status: DefaultStatus.ACTIVE,
      },
      take: dto.limit,
      skip: dto.offset,
    });
    return { result, total };
  }
  async findAll(dto: DefaultStatusPaginationDto) {
    const keyword = dto.keyword || '';
    const [result, total] = await this.termsPolicyRepository.findAndCount({
      where: {
        terms: Like('%' + keyword + '%'),
        privacy_policy: Like('%' + keyword + '%'),
        status: dto.status,
      },
      take: dto.limit,
      skip: dto.offset,
    });
    return { result, total };
  }

  async update(id: string, dto: TermsPolicyDto) {
    const result = await this.termsPolicyRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Terms & Condition  not found!');
    }
    const obj = Object.assign(result, dto);
    return this.termsPolicyRepository.save(obj);
  }

  async status(id: string, dto: DefaultStatus) {
    const result = await this.termsPolicyRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Terms & Condition  not found!');
    }
    const obj = Object.assign(result, dto);
    return this.termsPolicyRepository.save(obj);
  }
}
