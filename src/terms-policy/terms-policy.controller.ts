import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TermsPolicyService } from './terms-policy.service';
import { TermsPolicy } from 'src/terms-policy/entities/terms-policy.entity';

import { AuthGuard } from '@nestjs/passport';
import { PaginationDto, TermsPolicyDto } from './dto/terms-policy.dto';
import { RolesGuard } from 'src/auth/guards/roles.gurad';
import { DefaultStatus, UserRole } from 'src/enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';

@Controller('terms-policy')
export class TermsPolicyController {
  constructor(private readonly termsPolicyService: TermsPolicyService) {}
  @Post()
  create(@Body() dto: TermsPolicyDto) {
    return this.termsPolicyService.create(dto);
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  findAllTermsPolicy(@Query() dto: DefaultStatusPaginationDto) {
    return this.termsPolicyService.findAll(dto);
  }

  @Get()
  findTermsPolicy(@Query() dto: PaginationDto) {
    return this.termsPolicyService.find(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  updateTermsPolicy(@Param('id') id: string, @Body() dto: TermsPolicyDto) {
    return this.termsPolicyService.update(id, dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  updateStatus(@Param('id') id: string, @Body() dto: DefaultStatus) {
    return this.termsPolicyService.status(id, dto);
  }
}
