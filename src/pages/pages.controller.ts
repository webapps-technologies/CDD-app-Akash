import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { PageDto } from './dto/page.dto';
import { PagesService } from './pages.service';
import { RolesGuard } from 'src/auth/guards/roles.gurad';
import { UserRole } from 'src/enum';
import { Roles } from 'src/auth/decorator/roles.decorator';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard,)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard, )
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updatePageDto: PageDto) {
    return this.pagesService.update(+id, updatePageDto);
  }
}
