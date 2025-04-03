import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: PageDto) {
    return this.pagesService.create(dto);
  }

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updatePageDto: PageDto) {
    return this.pagesService.update(+id, updatePageDto);
  }
}
