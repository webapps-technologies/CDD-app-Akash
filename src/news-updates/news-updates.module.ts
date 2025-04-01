import { Module } from '@nestjs/common';
import { NewsUpdatesService } from './news-updates.service';
import { NewsUpdatesController } from './news-updates.controller';

@Module({
  controllers: [NewsUpdatesController],
  providers: [NewsUpdatesService],
})
export class NewsUpdatesModule {}
