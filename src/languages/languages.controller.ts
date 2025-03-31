import { Controller, Get, Post, Body, Patch, Param, Delete ,UseGuards, Put, Query} from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguageDto, PaginationDto } from './dto/languages.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.gurad';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { DefaultStatus, UserRole } from 'src/enum';
import { DefaultStatusPaginationDto } from 'src/common/dto/default-status-pagination.dto';


@Controller('languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
    @UseGuards( RolesGuard, )
    @Roles(UserRole.ADMIN, )
    create(@Body() dto: LanguageDto) {
      return this.languagesService.create(dto);
    }


    @Get('all')
  // @UseGuards(AuthGuard('jwt'), RolesGuard,)
  // @Roles(UserRole.ADMIN, )
  findAll(@Query() dto: DefaultStatusPaginationDto) {
    return this.languagesService.findAll(dto);
  }

  @Get()
  find(@Query() dto: PaginationDto) {
    return this.languagesService.find(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard, )
  @Roles(UserRole.ADMIN, )
  update(@Param('id') id: string, @Body() dto: LanguageDto) {
    return this.languagesService.update(id, dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard, )
  @Roles(UserRole.ADMIN, )
  status(@Param('id') id: string, @Body() dto: DefaultStatus) {
    return this.languagesService.status(id, dto);
  }
}


