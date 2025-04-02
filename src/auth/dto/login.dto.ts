import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class MobLoginDto {
  @IsNotEmpty()
  loginId: string;

  @IsNotEmpty()
  deviceId: string;
}

export class WebLoginDto {
  @IsNotEmpty()
  loginId: string;
}

export class OtpDto {
  @IsNotEmpty()
  phoneNumber : string;

  @IsNotEmpty()
  otp: string;
}

export class SigninDto {
  @IsNotEmpty()
  phoneNumber: string;
}

export class AdminSigninDto {
  @IsNotEmpty()
  loginId: string;

  @IsOptional()
  password: string
}


export class StaffLoinDto {
  @IsNotEmpty()
  loginId: string;
  @IsNotEmpty()
  password: string;
}

export class CreateDetailDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;
  
  @IsOptional()
  profileId: number;

  @IsOptional()
  wpNo: string;

  @IsNotEmpty()
  @IsUrl()
  profile: string;

  @IsOptional()
  accountId: string;
}
export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6) 
  password: string;
}
