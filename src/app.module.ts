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
import { TermsPolicyModule } from './terms-policy/terms-policy.module';
import { PrivacyPolicyModule } from './privacy-policy/privacy-policy.module';
import { DataModule } from './privacy/data/data.module';
import { WhyChoseUsModule } from './why-chose-us/why-chose-us.module';

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
      database: process.env.DB_NAME ,
      entities:  [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      
    }),
    
    AccountModule, UserDetailsModule, AuthModule, DoctorDetailsModule, LanguagesModule, TermsPolicyModule, PrivacyPolicyModule, DataModule, WhyChoseUsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
