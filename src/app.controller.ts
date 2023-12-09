import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

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
}
