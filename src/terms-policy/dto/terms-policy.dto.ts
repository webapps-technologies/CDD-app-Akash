import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {

  IsBoolean,
  IsNotEmpty,
  IsNumber,
  Max,
  Min,
  MinLength,
  MaxLength,
  IsOptional,
  IsString,
} from 'class-validator';

export class TermsPolicyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  terms: string;

  @ApiProperty()
  @IsNotEmpty()
    @IsString()
    privacy_policy: string;
}

export class StatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform(({ value }) => value)
  @IsBoolean()
  status: boolean;
}

export class PaginationDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(10)
  @Max(50)
  limit: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset: number;

  @ApiProperty()
  keyword: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  status: boolean;
}
