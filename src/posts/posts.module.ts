import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './entities/posts.entity';
import { LoggerModule } from 'src/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModel } from 'src/users/entities/users.entity';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    LoggerModule,
    JwtModule.register({}),
    //forFeature는 모델에 해당되는 레포지토리를 주입할때 사용
    TypeOrmModule.forFeature([
      //불러오려는 모델 정의
      PostsModel,
      UsersModel,
    ]),
  ],
  //컨트롤러 등록, 클래스는 등록함, 인스턴스를 생성은 x
  controllers: [PostController],
  //클래스를 인스턴스화 하지 않고 실행가능
  //IoC컨테이너가 인스턴스로 생성 후 의존성 주입
  providers: [PostsService, AuthService, UsersService],
})
export class PostsModule {}
