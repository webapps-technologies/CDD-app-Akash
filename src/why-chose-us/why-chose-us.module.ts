import { Module } from '@nestjs/common';
import { WhyChoseUsService } from './why-chose-us.service';
import { WhyChoseUsController } from './why-chose-us.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhyChoseUs } from './entities/why-chose-us.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhyChoseUs])],
  controllers: [WhyChoseUsController],
  providers: [WhyChoseUsService],
})
export class WhyChoseUsModule {}
