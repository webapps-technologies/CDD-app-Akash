import { Injectable,ConflictException,UnauthorizedException, Inject, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { Account } from 'src/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorDetail } from 'src/doctor-details/entities/doctor-detail.entity';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/enum';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'; // Cache interface
import { OtpDto, SigninDto } from './dto/login.dto';
import APIFeatures from 'src/utils/apiFeatures.utils';

export class AuthService {
  smsService: any;
  
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    @InjectRepository(DoctorDetail) private readonly doctorrepo:Repository<DoctorDetail>,
    @InjectRepository(UserDetail) private readonly userrepo:Repository<UserDetail>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache


  ){}
 
  async verifyOtp(dto: OtpDto) {
    const user = await this.getUserDetails(dto.phoneNumber, UserRole.USER);
    if (!user) {
      throw new NotFoundException('User not found with this Phone Number!');
    }
    const sentOtp = await this.cacheManager.get(dto.phoneNumber);
    if (!sentOtp) {
      throw new UnauthorizedException('OTP expired or not found!');
    }
    if (dto.otp !== sentOtp) {
      throw new UnauthorizedException('Invalid OTP!');
    }
    const token = await APIFeatures.assignJwtToken(user.id, this.jwtService);
    await this.cacheManager.del(dto.phoneNumber);
    return { token, accountId: user.id };
  }

  async sentOtp(dto: SigninDto) {
    const user = await this.repo.findOne({
      where: { PhoneNumber: dto.phoneNumber, roles: UserRole.USER },
    });
    if (user) {
      throw new ConflictException(
        'Phone Number already exists with another account!',
      );
    }
    const otp = 783200;
    // const otp = Math.floor(1000 + Math.random() * 9000);
    // sendOtp(+dto.phoneNumber, otp);
    this.cacheManager.set(dto.phoneNumber, otp, 10 * 60 * 1000);

    return {
      phoneNumber: dto.phoneNumber,
      success: true,
      message: 'OTP sent succesfully',
    };
  }


  // async signIn(loginId: string, password: string) {
  //   const admin = await this.getUserDetails(loginId, UserRole.ADMIN);
  //   const comparePassword = await bcrypt.compare(password, admin.password);
  //   if (!comparePassword) {
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }
  //   const token = await APIFeatures.assignJwtToken(admin.id, this.jwtService);
  //   return { token };
  // }
 
  private getUserDetails = async (
    id: string,
    role?: UserRole,
  ): Promise<any> => {
    // let result = await this.cacheManager.get('userDetail' + id);
    // if (!result) {
    const query = this.repo
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.octorDetail', 'octorDetail')
      .leftJoinAndSelect('account.userDetail', 'userDetail')
      .select([
        'account.id',
        'account.password',
        'account.roles',
        'account.status',
        'account.createdBy',
        'companyDetail.id',
        'companyDetail.name',
        'companyDetail.status',
        'userDetail.id',
        'userDetail.name',
      ]);
    if (!role && role == UserRole.USER) {
      query.where('account.roles = :roles', { roles: UserRole.USER });
    }
    if (!role && role == UserRole.VENDOR) {
      query.where('account.roles IN (:...roles)', {
        roles: [UserRole.VENDOR, UserRole.STAFF],
      });
    }
    if (!role && role == UserRole.ADMIN) {
      query.where('account.roles IN (:...roles)', {
        roles: [UserRole.ADMIN, UserRole.EMPLOYEE],
      });
    }
    const result = await query
      .andWhere('account.id = :id OR account.phoneNumber = :phoneNumber', {
        id: id,
        phoneNumber: id,
      })
      .getOne();
    // this.cacheManager.set('userDetail' + id, result, 7 * 24 * 60 * 60 * 1000);
    // }
    if (!result) {
      throw new UnauthorizedException('Account not found!');
    }
    return result;
  };



}



































// async register(Dto: RegisterDto): Promise<Account> {
//   const existingUser = await this.repo.findOne({ where: { email: Dto.email } });
//   if (existingUser) {
//       throw new ConflictException('User with this email already exists');
//   }
//   const hashedPassword = await bcrypt.hash(Dto.password, 10);
//   const payload = this.repo.create({
//       name: Dto.name,
//       email: Dto.email,
//       password: hashedPassword,
//       roles: Dto.roles ,  
//   });
//   const savedAccount = await this.repo.save(payload);
//   if(Dto.roles=== UserRole.DOCTOR){
//     const doctorDetail = this.doctorrepo.create({
//         name: Dto.name, 
//         email: Dto.email,
//         roles: Dto.roles,
//         accountId: savedAccount.id,  
//     });
//     await this.doctorrepo.save(doctorDetail);
//   } else if(Dto.roles=== UserRole.USER){
//     const UserDetail = this.userrepo.create({
//       name: Dto.name, 
//       email: Dto.email,
//       accountId: savedAccount.id,  
//   });
//   await this.userrepo.save(UserDetail);
//   }
//   return savedAccount;
// }

// async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
// const { email, password } = loginDto;
// const user = await this.repo.findOne({ where: { email },  });
// if (!user) {
//   throw new UnauthorizedException('Invalid credentials');
// }
// const isPasswordValid = await bcrypt.compare(password, user.password);
// if (!isPasswordValid) {
//   throw new UnauthorizedException('Invalid credentials');
// }
// const payload = { userId: user.id,};

// const accessToken = await this.jwtService.sign(payload);
// return { accessToken };
// }






