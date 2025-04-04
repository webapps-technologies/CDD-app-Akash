import { Module } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { UserDetailsController } from './user-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetail } from './entities/user-detail.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Account } from './../account/entities/account.entity';
@Module({
  imports:[TypeOrmModule.forFeature([UserDetail,Account]),AuthModule],

controllers: [UserDetailsController],
  providers: [UserDetailsService],
})
export class UserDetailsModule {}
