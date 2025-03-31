import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDetailDto } from './dto/create-doctor-detail.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';


import { DoctorDetail } from 'src/doctor-details/entities/doctor-detail.entity';
import { PaginationDto, UpdateDoctorDetailDto } from './dto/update-doctor-detail.dto';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';

@Injectable()
export class DoctorDetailsService {
constructor(
  @InjectRepository (DoctorDetail) private readonly DoctorRepo:Repository<DoctorDetail>,
){}


async getProfile(id: string) {
  const result = await this.DoctorRepo
    .createQueryBuilder('doctorDetail')
    .leftJoinAndSelect('doctorDetail.account', 'account')
    .select([
      'doctorDetail.id',
      'doctorDetail.name',
      'doctorDetail.email',
      'doctorDetail.designation',
      'doctorDetail.specialization',
      'doctorDetail. collegeName',
      'doctorDetail.studyYear',
      'doctorDetail.clinicName',
      'doctorDetail.experienceYears',
      'doctorDetail.accountId',
      'account.id',
      'account.email',
      'account.roles',
    ])
    .where('doctorDetail.accountId = :id', { id: id })
    .getOne();
  if (!result) {
    throw new NotFoundException('User not found!');
  }
  return result;
}



async findAll(dto: PaginationDto) {
  const keyword = dto.keyword || '';
  const [result, total] = await this.DoctorRepo
    .createQueryBuilder('doctorDetail')
    .leftJoinAndSelect('doctorDetail.account', 'account')
    .andWhere(
      new Brackets((qb) => {
        qb.where(
          'account.email LIKE :email OR doctorDetail.name LIKE :name ',
          {
            email: '%' + keyword + '%',
            name: '%' + keyword + '%',
            
          },
        );
      }),
    )
    .skip(dto.offset)
    .take(dto.limit)
    .orderBy({ 'doctorDetail.name': 'ASC' })
    .getManyAndCount();
  return { result, total };
}

async getdoctorById( doctorId: string, ) {
  const DoctorDetail = await this.DoctorRepo.createQueryBuilder('doctorDetail')
    .where('doctorDetail.id = :id', { id: doctorId })
    .getOne();
  return DoctorDetail;
}

async update(id: string, dto: UpdateDoctorProfileDto) {
      const result = await this.DoctorRepo.findOne({ where: { accountId: id } });
      if (!result) {
        throw new NotFoundException('doctor not found!');
      }
      const obj = Object.assign(result, dto);
      return this.DoctorRepo.save(obj);
    }



   async profileImage(image: string, result: DoctorDetail) {
    const obj = Object.assign(result, {
      profile: process.env.PORT + image,
      profileName: image,
    });
    return this.DoctorRepo.save(obj);
  }


  async findCompany(id: string) {
        const result = await this.DoctorRepo
          .createQueryBuilder('DoctorDetail')
          .where('doctorDetail.accountId = :accountId', { accountId: id })
          .getOne();
        if (!result) {
          throw new NotFoundException('Company not found!');
        }
        return result;
      }
}
