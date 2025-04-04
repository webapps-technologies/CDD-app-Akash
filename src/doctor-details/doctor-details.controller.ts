import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseInterceptors,
  Req,
  MaxFileSizeValidator,
  FileTypeValidator,
  UploadedFile,
  ParseFilePipe,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { Multer } from 'multer';
import { DoctorDetailsService } from './doctor-details.service';
import { CreateDoctorDetailDto } from './dto/create-doctor-detail.dto';
import {
  PaginationDto,
  UpdateDoctorDetailDto,
} from './dto/update-doctor-detail.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt.gurad';
import { RolesGuard } from 'src/auth/guards/roles.gurad';
import { UserRole } from 'src/enum';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { Account } from 'src/account/entities/account.entity';
import { DoctorDetail } from 'src/doctor-details/entities/doctor-detail.entity';
import { Request } from 'express';
import { UpdateDoctorProfileDto } from './dto/update-doctor-profile.dto';
@Controller('doctor-details')
export class DoctorDetailsController {
  constructor(private readonly doctorDetailsService: DoctorDetailsService) {}

  @Get()
  findAll(@Query() dto: PaginationDto) {
    return this.doctorDetailsService.findAll(dto);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(...Object.values(UserRole))
  profile(@CurrentUser() user: Account) {
    return this.doctorDetailsService.getProfile(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  async getDoctorById(@Param('id') doctorId: string) {
    return this.doctorDetailsService.getdoctorById(doctorId);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.DOCTOR)
  update(@CurrentUser() user: Account, @Body() dto: UpdateDoctorProfileDto) {
    return this.doctorDetailsService.update(user.id, dto);
  }

  @Put('profile')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.DOCTOR)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/doctor/profile',
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
  async profileImage(
    @CurrentUser() user: Account,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 1 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const fileData = await this.doctorDetailsService.findDoctor(user.id);
    return this.doctorDetailsService.profileImage(file.path, fileData);
  }
}
