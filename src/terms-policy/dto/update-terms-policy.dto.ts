import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateTermsPolicyDto {
  @IsNotEmpty()
  @IsString()
  terms: string;

  @IsNotEmpty()
  @IsString()
  privacy_policy: string;

}
