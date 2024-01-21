import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //AppMoudle 인스턴스 생성
  const app = await NestFactory.create(AppModule);
  //app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  //앱 전체적으로 Validator사용가능
  //Validator들이 실행되도록 설정
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, () => {
    console.log('3000번에서 실행했지롱 ㅋ');
  });
}
bootstrap();
