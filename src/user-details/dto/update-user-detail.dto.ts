import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDetailDto } from './create-user-detail.dto';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDetailDto extends PartialType(CreateUserDetailDto) {}

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