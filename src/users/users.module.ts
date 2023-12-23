import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersModel])],
  //UsersService를 다른 모듈에서 사용가능하도록 ex)authModule
  exports: [UsersService],
  controllers: [UsersController],
  //프로파이더에 입력된 값은 UsersModule안에서만 사용가능
  providers: [UsersService],
})
export class UsersModule {}
