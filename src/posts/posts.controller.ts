import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostController {
  //PostsService 주입, 인스턴스를 생성해서 주입하지 않았음
  //nest.js IoC 컨테이너에서 인스턴스를 생성해서 PostsService주입
  constructor(private readonly postService: PostsService) {}

  //모든 /posts를 가져온다
  @Get()
  getPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  //데코레이터에 url 파라미터의 이름지정
  getPost(@Param('id') id: string) {
    return this.postService.getPostById(+id);
  }

  @Post()
  postsPosts(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ) {
    return this.postService.createPost(author, title, content);
  }

  @Put(':id')
  PutPost(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ) {
    return this.postService.updatePost(+id, author, title, content);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(+id);
  }
}
