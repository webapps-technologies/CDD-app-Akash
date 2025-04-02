import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
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
import { RegisterDto } from './dto/register.dto';

export class AuthService {
  smsService: any;

  constructor(
    private jwtService: JwtService,
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    @InjectRepository(DoctorDetail)
    private readonly doctorrepo: Repository<DoctorDetail>,
    @InjectRepository(UserDetail)
    private readonly userrepo: Repository<UserDetail>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async verifyOtp(dto: OtpDto) {
    const user = await this.getUserByPhoneNumber(dto.PhoneNumber);
    console.log("1",user);
    if (!user) {
      throw new NotFoundException('User not found with this Phone Number!');
    }

    const sentOtp = await this.cacheManager.get(dto.otp);
    console.log("2",sentOtp);
    if (!sentOtp) {
      throw new UnauthorizedException('OTP expired or not found!');
    }
    if (dto.otp !== sentOtp) {
      throw new UnauthorizedException('Invalid OTP!');
    }
    const token = await APIFeatures.assignJwtToken(user.id, this.jwtService);
    await this.cacheManager.del(dto.PhoneNumber);
    return { token, accountId: user.id };
  }

  async sentOtp(dto: SigninDto) {
    // const user = await this.repo.findOne({
    //   where: { PhoneNumber: dto.phoneNumber },
    // });
    // if (user) {
    //   throw new ConflictException(
    //     'Phone Number already exists with another account!',
    //   );
    // }
    // const otp = 231232;
    const otp = Math.floor(1000 + Math.random() * 9000);

    this.cacheManager.set(dto.phoneNumber, otp, 10 * 60 * 1000);

    return {
      otp,
      phoneNumber: dto.phoneNumber,
      success: true,
      message: 'OTP sent succesfully',
    };
  }
  async signIn(loginId: string, password: string) {
    const admin = await this.getUserDetails(loginId, UserRole.ADMIN);
    const comparePassword = await bcrypt.compare(password, admin.password);
    if (!comparePassword) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const token = await APIFeatures.assignJwtToken(admin.id, this.jwtService);
    return { token };
  }

  private getUserByPhoneNumber = async (phoneNumber: string): Promise<Account | null> => {
    console.log(" phone number", phoneNumber);
  
    const result = await this.repo
      .createQueryBuilder('account')
      .where('account.PhoneNumber = :phoneNumber', { phoneNumber })
      .getOne();
  
    console.log("Query result:", result);
  
    if (!result) {
      console.log("Account not found!");
      throw new UnauthorizedException('Account not found!');
    }
  
    return result;
  };
  
   
  async register(Dto: RegisterDto): Promise<Account> {
    const existingUser = await this.repo.findOne({
      where: { PhoneNumber: Dto.PhoneNumber },
    });
    if (existingUser) {
      throw new ConflictException('User with this ph number exists');
    }

    const payload = this.repo.create({
      name: Dto.name,
      PhoneNumber: Dto.PhoneNumber,
      email: Dto.email,
      roles: Dto.roles,
    });
    const savedAccount = await this.repo.save(payload);
    if (Dto.roles === UserRole.DOCTOR) {
      const doctorDetail = this.doctorrepo.create({
        name: Dto.name,
        email: Dto.email,
        accountId: savedAccount.id,
      });
      await this.doctorrepo.save(doctorDetail);
    } else if (Dto.roles === UserRole.USER) {
      const UserDetail = this.userrepo.create({
        name: Dto.name,
        email: Dto.email,
        accountId: savedAccount.id,
      });
      await this.userrepo.save(UserDetail);
    }
    return savedAccount;
  }
}

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
