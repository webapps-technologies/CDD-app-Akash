import { Module } from '@nestjs/common';
import { CaseHistoryService } from './case-history.service';
import { CaseHistoryController } from './case-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CaseHistory } from './entities/case-history.entity';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { DoctorDetail } from 'src/doctor-details/entities/doctor-detail.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([CaseHistory,UserDetail,DoctorDetail]),AuthModule],
  controllers: [CaseHistoryController],
  providers: [CaseHistoryService],
})
export class CaseHistoryModule {}
