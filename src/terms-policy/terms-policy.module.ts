import { Module } from '@nestjs/common';
import { TermsPolicyService } from './terms-policy.service';
import { TermsPolicyController } from './terms-policy.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TermsPolicy } from './entities/terms-policy.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TermsPolicy])],
  controllers: [TermsPolicyController],
  providers: [TermsPolicyService],
})
export class TermsPolicyModule {}
