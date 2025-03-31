import { Injectable,ConflictException,UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register.dto';
import { Account } from 'src/account/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorDetail } from 'src/doctor-details/entities/doctor-detail.entity';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserRole } from 'src/enum';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Account) private readonly repo: Repository<Account>,
    @InjectRepository(DoctorDetail) private readonly doctorrepo:Repository<DoctorDetail>,
    @InjectRepository(UserDetail) private readonly userrepo:Repository<UserDetail>,


  ){}
 
  async register(Dto: RegisterDto): Promise<Account> {
    const existingUser = await this.repo.findOne({ where: { email: Dto.email } });
    if (existingUser) {
        throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(Dto.password, 10);
    const payload = this.repo.create({
        name: Dto.name,
        email: Dto.email,
        password: hashedPassword,
        roles: Dto.roles ,  
    });
    const savedAccount = await this.repo.save(payload);
    if(Dto.roles=== UserRole.DOCTOR){
      const doctorDetail = this.doctorrepo.create({
          name: Dto.name, 
          email: Dto.email,
          roles: Dto.roles,
          accountId: savedAccount.id,  
      });
      await this.doctorrepo.save(doctorDetail);
    } else if(Dto.roles=== UserRole.USER){
      const UserDetail = this.userrepo.create({
        name: Dto.name, 
        email: Dto.email,
        roles: Dto.roles,
        accountId: savedAccount.id,  
    });
    await this.userrepo.save(UserDetail);
    }
    return savedAccount;
}

async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
  const { email, password } = loginDto;
  const user = await this.repo.findOne({ where: { email },  });
  if (!user) {
    throw new UnauthorizedException('Invalid credentials');
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthorizedException('Invalid credentials');
  }
  const payload = { userId: user.id,};
  
  const accessToken = await this.jwtService.sign(payload);
  return { accessToken };
}







}
