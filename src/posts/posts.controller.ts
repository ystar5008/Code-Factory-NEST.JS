import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { UppercasePipe } from 'src/auth/pipe/uppercase.pipe';
import { AccessTokenGuard } from 'src/auth/guard/bearer-token.guard';
import { UsersModel } from 'src/users/entities/users.entity';
import { User } from 'src/users/decorator/user.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dts';

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
  getPost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  //DTO - Data Transfer Object  - 데이터 전송 객체
  @Post()
  @UseGuards(AccessTokenGuard)
  postsPosts(@User('id') userId: number, @Body() body: CreatePostDto) {
    // create => 저장할 객체를 생성한다.
    // save => 객체를 저장한다 , create메서드에서 생성한 객체로
    return this.postService.createPost(userId, body);
  }

  @Patch(':id')
  PatchPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
  ) {
    return this.postService.updatePost(id, body);
  }

  @Delete(':id')
  deletePost(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePost(id);
  }
}
