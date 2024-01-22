import {
  ValidationPipe,
  ClassSerializerInterceptor,
  Logger,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // //전역 로거 선언
  // const logger = new Logger('Global');
  // //로거 미들웨어
  // app.useLogger(logger);
  app.use(
    //이 부분 추가
    //docs 엔드포인트에 접근할 때 Basic Authentication을 적용합니다.
    ['/docs'], // docs(swagger end point)에 진입시
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD, // 지정된 ID/비밀번호
      },
    }),
  );
  //app.enableCors()를 사용하여 CORS를 활성화합니다.
  // app.enableCors();
  // //api의 전역 프리픽스를 /api로 설정하며, '/'를 제외함
  // app.setGlobalPrefix('/api', { exclude: ['/'] });
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // const config = new DocumentBuilder()
  //   .setTitle('Noname Server')
  //   .setDescription('Noname Server API description')
  //   .setVersion('1.0.0')
  //   .addBearerAuth(
  //     {
  //       type: 'http',
  //       scheme: 'bearer',
  //       bearerFormat: 'JWT',
  //       name: 'JWT',
  //       in: 'header',
  //     },
  //     'token',
  //   )
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('docs', app, document, {
  //   swaggerOptions: {
  //     persistAuthorization: true,
  //   },
  // });

  // await app.listen(process.env.PORT);
  // console.log(`Application is running on: ${await app.getUrl()}`);
  //app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000, () => {
    console.log('3000번에서 실행했지롱 ㅋ');
  });
}
bootstrap();
