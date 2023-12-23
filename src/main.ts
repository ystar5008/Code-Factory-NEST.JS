import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  //AppMoudle 인스턴스 생성
  const app = await NestFactory.create(AppModule);
  //app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000, () => {
    console.log('3000번에서 실행했지롱 ㅋ');
  });
}
bootstrap();
