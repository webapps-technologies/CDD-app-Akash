import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator, MaxFileSizeValidator, UseGuards } from '@nestjs/common';
import { NewsUpdatesService } from './news-updates.service';
import { NewsUpdateDto } from './dto/news-update.dto';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.gurad';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserRole } from 'src/enum';


@Controller('news-updates')
export class NewsUpdatesController {
  constructor(private readonly newsUpdatesService: NewsUpdatesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard, )
    @Roles(UserRole.ADMIN, )
  create(@Body() Dto:NewsUpdateDto) {
    return this.newsUpdatesService.create(Dto);
  }
  @Get()
  findAll(@Query()dto:CommonPaginationDto){
    return this.newsUpdatesService.findAll(dto);
  }

  @Get(":id")
  @UseGuards(AuthGuard('jwt'), RolesGuard, )
  @Roles(UserRole.ADMIN, )
  findOne(@Param(':id') id: string){
    return this.newsUpdatesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id:string, @Body() dot:NewsUpdateDto){
    return this.newsUpdatesService.update(id,dot);
  }

  @Put('image/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard, )
  @Roles(UserRole.ADMIN, )
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
  const fileData = await this.newsUpdatesService.findOne(id);
  return this.newsUpdatesService.image(file.path,fileData);

  }
}
