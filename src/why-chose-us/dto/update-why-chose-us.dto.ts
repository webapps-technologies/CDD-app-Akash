import { PartialType } from '@nestjs/swagger';
import { CreateWhyChoseUsDto } from './create-why-chose-us.dto';

export class UpdateWhyChoseUsDto extends PartialType(CreateWhyChoseUsDto) {}
