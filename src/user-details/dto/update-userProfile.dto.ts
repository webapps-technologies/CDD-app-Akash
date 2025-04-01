import { IsOptional, IsString, IsInt, Min, Max, IsDate, IsUrl } from 'class-validator';

export class UpdateuserProfileDto {
  @IsOptional()
  @IsString()
  name?: string;  

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  age?: number;  

   
}
