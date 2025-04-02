import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CaseHistoryService } from './case-history.service';
import { CreateCaseHistoryDto } from './dto/create-case-history.dto';
import { UpdateCaseHistoryDto } from './dto/update-case-history.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.gurad';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { Account } from 'src/account/entities/account.entity';

@Controller('case-history')
export class CaseHistoryController {
  doctorDetailsService: any;
  constructor(private readonly caseHistoryService: CaseHistoryService) {}
  @Post()
  async createCaseHistory(@Body() createCaseHistoryDto: CreateCaseHistoryDto) {
    return this.caseHistoryService.createCaseHistory(createCaseHistoryDto);
  }
 

  @Get('profile')
    @UseGuards(AuthGuard('jwt'),)
    profile(@CurrentUser() user: Account) {
      return this.doctorDetailsService.getProfile(user.id);
    }
  
}
