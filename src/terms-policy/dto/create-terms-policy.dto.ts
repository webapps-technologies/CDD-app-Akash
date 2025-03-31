import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTermsPolicyDto {
  @IsNotEmpty()
  @IsString()
  terms: string;

  @IsNotEmpty()
  @IsString()
  privacy_policy: string;
  
}
