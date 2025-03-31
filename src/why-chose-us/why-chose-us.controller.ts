import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WhyChoseUsService } from './why-chose-us.service';
import { CreateWhyChoseUsDto } from './dto/create-why-chose-us.dto';
import { UpdateWhyChoseUsDto } from './dto/update-why-chose-us.dto';

@Controller('why-chose-us')
export class WhyChoseUsController {
  constructor(private readonly whyChoseUsService: WhyChoseUsService) {}

  @Post()
  create(@Body() createWhyChoseUsDto: CreateWhyChoseUsDto) {
    return this.whyChoseUsService.create(createWhyChoseUsDto);
  }

  @Get()
  findAll() {
    return this.whyChoseUsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.whyChoseUsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWhyChoseUsDto: UpdateWhyChoseUsDto) {
    return this.whyChoseUsService.update(+id, updateWhyChoseUsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.whyChoseUsService.remove(+id);
  }
}
