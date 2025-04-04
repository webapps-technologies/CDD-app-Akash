import { Module } from '@nestjs/common';
import { NewsUpdatesService } from './news-updates.service';
import { NewsUpdatesController } from './news-updates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsUpdate } from './entities/news-update.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports:[TypeOrmModule.forFeature([NewsUpdate]),AuthModule,  MulterModule.register({ dest: './upload/newsupdate' }),],
  controllers: [NewsUpdatesController],
  providers: [NewsUpdatesService],
})
export class NewsUpdatesModule {}
