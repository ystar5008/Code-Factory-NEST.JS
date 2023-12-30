import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './posts/entities/posts.entity';
import { UsersModule } from './users/users.module';
import { UsersModel } from './users/entities/users.entity';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { CommonModule } from './common/common.module';

@Module({
  //다른 모듈을 등록
  //forRoot메서드는 typrorm과 nestjs와 연결할떄 사용 (DB)
  imports: [
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('MyApp', {
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    PostsModule,
    TypeOrmModule.forRoot({
      //데이터베이스 타입
      type: 'postgres',
      host: '127.0.0.1',
      port: 5433,
      username: 'postgres',
      password: '1111',
      database: 'postgres',
      //entities폴더에 작성한 PostsModel 가져오기
      entities: [PostsModel, UsersModel],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    HealthModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
