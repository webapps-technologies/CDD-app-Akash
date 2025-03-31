import { Module } from '@nestjs/common';
import { WhyChoseUsService } from './why-chose-us.service';
import { WhyChoseUsController } from './why-chose-us.controller';

@Module({
  controllers: [WhyChoseUsController],
  providers: [WhyChoseUsService],
})
export class WhyChoseUsModule {}
