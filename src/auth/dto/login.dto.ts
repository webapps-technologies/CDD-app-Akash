import { Type } from 'class-transformer';
import { IsNotEmpty,  MinLength , IsEmail, } from 'class-validator';


export class LoginDto {
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @MinLength(6) // Ensures password has a minimum length
    password: string;
  }