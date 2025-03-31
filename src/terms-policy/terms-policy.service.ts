import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTermsPolicyDto } from './dto/update-terms-policy.dto';
import { CreateTermsPolicyDto } from './dto/create-terms-policy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TermsPolicy } from './entities/terms-policy.entity';
import { Repository } from 'typeorm';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';

@Injectable()
export class TermsPolicyService {
  constructor( 
    @InjectRepository(TermsPolicy)
    private  readonly termsPolicyRepository: Repository<TermsPolicy>,

  ){}
   async create(dto: UpdateTermsPolicyDto) {
          const result = await this.termsPolicyRepository.findOne({
            where: { terms: dto.terms },
          });
          if (result) {
            throw new ConflictException('Language already exists!');
          }
          const obj = Object.assign(dto);
          return this.languageRepo.save(obj);
        }
  async createTermsPolicy(dto: UpdateTermsPolicyDto) {
    const termsPolicy = await this.termsPolicyRepository.create(dto);
    return this.termsPolicyRepository.save(termsPolicy);
  }

  
  async getTermsPolicy(dto:CommonPaginationDto): Promise<TermsPolicy> {
    const termsPolicy = await this.termsPolicyRepository.findOne({ where: {} });
    if (!termsPolicy) {
      throw new NotFoundException('Terms & Policy not found');
    }
    return termsPolicy;
  }

  async updateTermsPolicy(dto: UpdateTermsPolicyDto): Promise<TermsPolicy> {
    let termsPolicy = await this.termsPolicyRepository.findOne({ where: {} });
    if (!termsPolicy) {
      termsPolicy = this.termsPolicyRepository.create(dto);
    } else {
      termsPolicy.terms = dto.terms;
      termsPolicy.privacy_policy = dto.privacy_policy;
    }
    return this.termsPolicyRepository.save(termsPolicy);
  }
}
