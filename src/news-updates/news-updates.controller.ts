import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NewsUpdatesService } from './news-updates.service';


@Controller('news-updates')
export class NewsUpdatesController {
  constructor(private readonly newsUpdatesService: NewsUpdatesService) {}


}
