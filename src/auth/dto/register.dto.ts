import { IsEmail, IsEnum, IsNotEmpty, IsString,MinLength, IsOptional, MaxLength } from 'class-validator';
import { UserRole,  } from 'src/enum';

export class RegisterDto {
    @IsString()  
    @IsNotEmpty()  
    name: string;

    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(10)
    PhoneNumber: string;
  
    @IsEmail()  
    email: string;  
  
    @IsString()  
    @IsNotEmpty()  
    @MinLength(6, { message: 'Password must be at least 6 characters long' }) 
    password: string;  
  
    
    @IsEnum(UserRole, { message: '' })  
    roles:UserRole;  
}