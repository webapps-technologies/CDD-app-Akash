import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCaseHistoryDto {
    @IsString()
  doctorId: string;

  @IsString()
  userId: string;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsString()
  @IsNotEmpty()
  prescription: string;
}
