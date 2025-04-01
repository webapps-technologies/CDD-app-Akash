import { Module } from '@nestjs/common';
import { NewsUpdatesService } from './news-updates.service';
import { NewsUpdatesController } from './news-updates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsUpdate } from './entities/news-update.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[TypeOrmModule.forFeature([NewsUpdate]),AuthModule],
  controllers: [NewsUpdatesController],
  providers: [NewsUpdatesService],
})
export class NewsUpdatesModule {}
