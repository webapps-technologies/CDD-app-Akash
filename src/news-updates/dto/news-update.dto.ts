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

export class NewsUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  youtubeUrl: string;
}