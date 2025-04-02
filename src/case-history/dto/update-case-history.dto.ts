import { PartialType } from '@nestjs/swagger';
import { CreateCaseHistoryDto } from './create-case-history.dto';

export class UpdateCaseHistoryDto extends PartialType(CreateCaseHistoryDto) {}
