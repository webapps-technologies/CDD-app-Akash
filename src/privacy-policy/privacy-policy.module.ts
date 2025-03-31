import { Module } from '@nestjs/common';
import { PrivacyPolicyService } from './privacy-policy.service';
import { PrivacyPolicyController } from './privacy-policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivacyPolicy } from './entities/privacy-policy.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PrivacyPolicy])],
  controllers: [PrivacyPolicyController],
  providers: [PrivacyPolicyService],
})
export class PrivacyPolicyModule {}
