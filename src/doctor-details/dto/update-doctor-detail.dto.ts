import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorDetailDto } from './create-doctor-detail.dto';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDoctorDetailDto extends PartialType(CreateDoctorDetailDto) {}
export class PaginationDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(10)
    @Max(50)
    limit: number;
  
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    @Min(0)
    offset: number;
  
    @IsOptional()
    keyword?: string;
  
  }
