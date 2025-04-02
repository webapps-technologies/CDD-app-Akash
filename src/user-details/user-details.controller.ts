import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { PaginationDto, UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.gurad';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/enum';
import { Account } from 'src/account/entities/account.entity';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Controller('user-details')
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @Get()
    findAll(@Query() dto: PaginationDto) {
      return this.userDetailsService.findAll(dto);
    }
  
    @Get('profile')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(...Object.values(UserRole))
    profile(@CurrentUser() user: Account) {
      return this.userDetailsService.getProfile(user.id);
    }
  
    @Get(':id')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.ADMIN,UserRole.DOCTOR,)
    async getDoctorById(@Param('id') UserId: string) {
      return this.userDetailsService.getdoctorById(UserId);
    }
  
    @Patch()
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(UserRole.USER)
    update(@CurrentUser() user: Account, @Body() dto:UpdateUserDetailDto) {
      return this.userDetailsService.update(user.id, dto);
    }
  
}

