import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { PaginationDto, UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDetail } from './entities/user-detail.entity';
import { privateDecrypt } from 'crypto';
import { Brackets, Repository } from 'typeorm';
import { Account } from 'src/account/entities/account.entity';
import { UpdateuserProfileDto } from './dto/update-userProfile.dto';

@Injectable()
export class UserDetailsService {

  constructor(
    @InjectRepository (UserDetail) private readonly userdetailRepo:Repository<UserDetail>,
    @InjectRepository (Account) private readonly accountRepo:Repository<Account>,
  ){}
  async getProfile(id: string) {
      const result = await this.accountRepo.createQueryBuilder('account')
        .leftJoinAndSelect('account.userDetail', 'userDetail')
        .select([
          'account.id',
          'account.email',
          'account.roles',
          'userDetail.id',
          'userDetail.name',
          'userDetail.email',
          'userDetail.age',
          'userDetail.accountId',
         
        ])
        .where('userDetail.accountId = :id', { id: id })
        .getOne();
      if (!result) {
        throw new NotFoundException('User not found!');
      }
      return result;
    }
  
    async findAll(dto: PaginationDto) {
      const keyword = dto.keyword || '';
      const [result, total] = await this.userdetailRepo.createQueryBuilder(
        'userDetail',
      )
        .leftJoinAndSelect('userDetail.account', 'account')
        .andWhere(
          new Brackets((qb) => {
            qb.where(
              'account.email LIKE :email OR userDetail.name LIKE :name ',
              {
                email: '%' + keyword + '%',
                name: '%' + keyword + '%',
              },
            );
          }),
        )
        .skip(dto.offset)
        .take(dto.limit)
        .orderBy({ 'UserDetail.name': 'ASC' })
        .getManyAndCount();
      return { result, total };
    }
  
    async getdoctorById(userId: string) {
      const UserDetail = await this.userdetailRepo
      .createQueryBuilder(
        'userDetail',
      )
        .where('userDetail.id = :id', { id: userId })
        .getOne();
      return UserDetail;
    }
  
    async update(id: string, dto: UpdateuserProfileDto) {
      const result = await this.userdetailRepo.findOne({ where: { accountId: id } });
      if (!result) {
        throw new NotFoundException('User not found!');
      }
      const obj = Object.assign(result, dto);
      return this.userdetailRepo.save(obj);
    }
}
