import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, Put, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFile } from '@nestjs/common';
import { WhyChoseUsService } from './why-chose-us.service';
import { WhyChoseUsDto } from './dto/why-chose-us.dto';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('why-chose-us')
export class WhyChoseUsController {
  constructor(private readonly whyChoseUsService: WhyChoseUsService) {}

  @Post()
  create(@Body() Dto: WhyChoseUsDto) {
    return this.whyChoseUsService.create(Dto);
  }
  @Get()
  findAll(@Query()dto:CommonPaginationDto){
    return this.whyChoseUsService.findAll(dto);
  }

  @Get(":id")
  findOne(@Param(':id') id: string){
    return this.whyChoseUsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() dot:WhyChoseUsDto){
    return this.whyChoseUsService.update(id,dot);
  }

  @Put('image/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/whyChooseUs',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async image(
    @Param('id') id:string,
    @UploadedFile(
      new ParseFilePipe({
        validators:[
          new FileTypeValidator({fileType:'.(png|jpeg|jpg)'}),
          new MaxFileSizeValidator({maxSize:1024*1024*2}),
        ],
      }),
    )
    file: Express.Multer.File,

  ){
  const fileData = await this.whyChoseUsService.findOne(id);
  return this.whyChoseUsService.image(file.path,fileData);

  }

}
