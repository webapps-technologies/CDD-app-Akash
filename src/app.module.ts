import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { UserDetailsModule } from './user-details/user-details.module';
import { AuthModule } from './auth/auth.module';
import { DoctorDetailsModule } from './doctor-details/doctor-details.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguagesModule } from './languages/languages.module';
import { WhyChoseUsModule } from './why-chose-us/why-chose-us.module';
import { NewsUpdatesModule } from './news-updates/news-updates.module';
import { PagesModule } from './pages/pages.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize:false,
    }),
    CacheModule.register({
      store: 'memory',
      ttl: 0,
      isGlobal:true,
    }),

    AccountModule,
    UserDetailsModule,
    AuthModule,
    DoctorDetailsModule,
    LanguagesModule,
    WhyChoseUsModule,
    NewsUpdatesModule,
    PagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
