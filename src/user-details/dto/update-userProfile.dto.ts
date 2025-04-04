import { IsOptional, IsString, IsInt, Min, Max, IsDate, IsUrl } from 'class-validator';

export class UpdateuserProfileDto {
  @IsOptional()
  @IsString()
  name: string;  

  @IsOptional()
  @IsString()
  gender: string; 

  @IsOptional()
  @IsInt()
  age: number;  

  @IsOptional()
  @IsString()
  address: string; 
  

   
}
