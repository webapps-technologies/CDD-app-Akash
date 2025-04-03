import { IsOptional, IsString, IsInt, Min, Max, IsDate, IsUrl } from 'class-validator';

export class UpdateDoctorProfileDto {
  @IsOptional()
  @IsString()
  name?: string;
  

  @IsString()
  designation: string;

  @IsString()
  specialization: string;

  @IsOptional()
  @IsString()
  collegeName?: String; 

  @IsOptional()
  @IsInt()
  studyYear?: number;

  @IsOptional()
  @IsString()
  clinicName?: string;


  @IsOptional()
  @IsInt()
  experienceYears?: number;


  @IsOptional()
  @IsUrl()
  profilePhoto?: string;  

  @IsOptional()
  @IsDate()
  dob?: Date;  
}
