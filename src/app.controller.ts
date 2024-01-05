import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as jsonData from '명언.json';

interface Post {
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commnetCount: number;
}
@Controller('post')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/json')
  async calljson() {
    // console.log(jsonData.map((e) => e.author.includes('쇼펜하우어')));
    //console.log(jsonData);
    const result = jsonData.filter((item) => item.author === '쇼펜하우어');

    console.log(result);
    return result;
  }
}
