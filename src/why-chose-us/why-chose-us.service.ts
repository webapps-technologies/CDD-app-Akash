import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WhyChoseUsDto } from './dto/why-chose-us.dto';
import { title } from 'process';
import { WhyChoseUs } from './entities/why-chose-us.entity';
import { CommonPaginationDto } from 'src/common/dto/common-pagination.dto';



@Injectable()
export class WhyChoseUsService {
  
 constructor(
  @InjectRepository (WhyChoseUs) private readonly whychooseusrepo:Repository<WhyChoseUs>,
 ){}

  async create(dto:WhyChoseUsDto) {
           const result = await this.whychooseusrepo.findOne({
             where: { title: dto.title,
                      content:dto.content,
              },
           });
           if (result) {
             throw new ConflictException(' whychose us  already exists!');
           }
           const obj = Object.assign(dto);
           return this.whychooseusrepo.save(obj);
         }

         async findAll(dto: CommonPaginationDto) {
          const keyword = dto.keyword || '';
      
          const queryBuilder = this.whychooseusrepo.createQueryBuilder('why Choose us');
      
          if (keyword) {
              queryBuilder.andWhere(
                  '(whyChoose Us.title LIKE :keyword OR why Choose Us.content LIKE :keyword)', 
                  { keyword: `%${keyword}%` }
              );
          }
      
          queryBuilder.take(dto.limit).skip(dto.offset);
      
          const [result, count] = await queryBuilder.getManyAndCount();
      
          return { result, count };
      }
      
        async findOne(id:string){
          const result = await this.whychooseusrepo.findOne({
            where:{id:id}
          });
          if(!result){
            throw new NotFoundException('   why choose us not found..!')
          }
          return result;
        }
      
        async update(id:string, dto:WhyChoseUsDto){
          const result = await this.whychooseusrepo.findOne({where:{id:id}});
          if(!result){
            throw new NotFoundException('why choose us not found...!')
          }
          const obj = Object.assign(result,dto);
          return this.whychooseusrepo.save(obj);
        }
      
        async image(image:string, result:WhyChoseUs){
          const obj = Object.assign(result,{
            image:process.env.PORT + image,
            imagePath:image,
            
          });
          return this.whychooseusrepo.save(obj);
        }
        

  
}