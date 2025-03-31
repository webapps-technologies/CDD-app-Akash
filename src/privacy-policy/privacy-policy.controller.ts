import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Put } from '@nestjs/common';
import { PrivacyPolicyService } from './privacy-policy.service';
import { PaginationDto, privacypolicyDto } from './dto/privacy-policy.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.gurad';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { DefaultStatus, UserRole } from 'src/enum';
import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';


@Controller('privacy-policy')
export class PrivacyPolicyController {
  constructor(private readonly privacyPolicyService: PrivacyPolicyService) {}

   @Post()
       create(@Body() dto:privacypolicyDto) {
          return this.privacyPolicyService.create(dto);
        }
  
          @Get('all')
          @UseGuards(AuthGuard('jwt'), RolesGuard,)
          @Roles(UserRole.ADMIN, )
          findAllprivacypolicy(@Query() dto: DefaultStatusPaginationDto) {
            return this.privacyPolicyService.findAll(dto);
          }
        
        @Get()
          findprivacypolicy(@Query() dto: PaginationDto) {
            return this.privacyPolicyService.find(dto);
          }
        
          @Patch(':id')
          @UseGuards(AuthGuard('jwt'), RolesGuard, )
          @Roles(UserRole.ADMIN, )
          updateprivacypolicy(@Param('id') id: string, @Body() dto:privacypolicyDto) {
            return this.privacyPolicyService.update(id, dto);
          }
        
          @Put(':id')
          @UseGuards(AuthGuard('jwt'), RolesGuard, )
          @Roles(UserRole.ADMIN, )
          updateStatus(@Param('id') id: string, @Body() dto: DefaultStatus) {
            return this.privacyPolicyService.status(id, dto);
          }
}
