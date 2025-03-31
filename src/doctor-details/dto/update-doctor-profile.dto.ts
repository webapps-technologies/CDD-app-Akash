import { IsOptional, IsString, IsInt, Min, Max, IsDate, IsUrl } from 'class-validator';

export class UpdateDoctorProfileDto {
  @IsOptional()
  @IsString()
  name?: string;  

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(10)
  collegeYear?: number;  

  @IsOptional()
  @IsUrl()
  profilePhoto?: string;  

  @IsOptional()
  @IsDate()
  dob?: Date;  
}
