import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';

@Module({
  //다른 모듈을 등록
  imports: [PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
