import { Module } from '@nestjs/common';
import { DoctorDetailsService } from './doctor-details.service';
import { DoctorDetailsController } from './doctor-details.controller';
import { DoctorDetail } from './entities/doctor-detail.entity';
import { Account } from 'src/account/entities/account.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [  TypeOrmModule.forFeature([DoctorDetail,Account]),
  AuthModule,

  ],
  controllers: [DoctorDetailsController],
  providers: [DoctorDetailsService],
})
export class DoctorDetailsModule {}
