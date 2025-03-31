import { Injectable } from '@nestjs/common';
import { CreateWhyChoseUsDto } from './dto/create-why-chose-us.dto';
import { UpdateWhyChoseUsDto } from './dto/update-why-chose-us.dto';

@Injectable()
export class WhyChoseUsService {
  create(createWhyChoseUsDto: CreateWhyChoseUsDto) {
    return 'This action adds a new whyChoseUs';
  }

  findAll() {
    return `This action returns all whyChoseUs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} whyChoseUs`;
  }

  update(id: number, updateWhyChoseUsDto: UpdateWhyChoseUsDto) {
    return `This action updates a #${id} whyChoseUs`;
  }

  remove(id: number) {
    return `This action removes a #${id} whyChoseUs`;
  }
}
