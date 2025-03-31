import { IsEmail, IsEnum, IsNotEmpty, IsString,MinLength, IsOptional } from 'class-validator';
import { UserRole,  } from 'src/enum';

export class RegisterDto {
    @IsString()  
    @IsNotEmpty()  
    name: string;
  
    @IsEmail()  
    email: string;  
  
    @IsString()  
    @IsNotEmpty()  
    @MinLength(6, { message: 'Password must be at least 6 characters long' }) 
    password: string;  
  
    
    @IsEnum(UserRole, { message: '' })  
    roles:UserRole;  
}