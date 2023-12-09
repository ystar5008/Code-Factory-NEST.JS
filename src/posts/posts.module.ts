import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostController } from './posts.controller';

@Module({
  //컨트롤러 등록, 클래스는 등록함, 인스턴스를 생성은 x
  controllers: [PostController],
  //클래스를 인스턴스화 하지 않고 실행가능
  //IoC컨테이너가 인스턴스로 생성 후 의존성 주입
  providers: [PostsService],
})
export class PostsModule {}
