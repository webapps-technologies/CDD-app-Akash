import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { NewsUpdateDto } from './dto/news-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsUpdate } from './entities/news-update.entity';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';


@Injectable()
export class NewsUpdatesService {

    constructor(
        @InjectRepository (NewsUpdate) private readonly newsupdaterepo:Repository<NewsUpdate>
    ){}
  async create(dto:NewsUpdateDto) {
            const result = await this.newsupdaterepo.findOne({
              where: { title: dto.title,
                       desc:dto.content,
               },
            });
            if (result) {
              throw new ConflictException(' news already exists!');
            }
            const obj = Object.assign(dto);
            return this.newsupdaterepo.save(obj);
          }
 
          async findAll(dto: CommonPaginationDto) {
           const keyword = dto.keyword || '';
       
           const queryBuilder = this.newsupdaterepo.createQueryBuilder('blog');
       
           if (keyword) {
               queryBuilder.andWhere(
                   '(newa.title LIKE :keyword OR news.desc LIKE :keyword)', 
                   { keyword: `%${keyword}%` }
               );
           }
       
           queryBuilder.take(dto.limit).skip(dto.offset);
       
           const [result, count] = await queryBuilder.getManyAndCount();
       
           return { result, count };
       }
       
         async findOne(id:string){
           const result = await this.newsupdaterepo.findOne({
             where:{id:id}
           });
           if(!result){
             throw new NotFoundException('  news us not found..!')
           }
           return result;
         }
       
         async update(id:string, dto:NewsUpdateDto){
           const result = await this.newsupdaterepo.findOne({where:{id:id}});
           if(!result){
             throw new NotFoundException('news us not found...!')
           }
           const obj = Object.assign(result,dto);
           return this.newsupdaterepo.save(obj);
         }
       
         async image(image:string, result:NewsUpdate){
           const obj = Object.assign(result,{
             image:process.env.PORT + image,
             imagePath:image,
             
           });
           return this.newsupdaterepo.save(obj);
         }
         
 

}
