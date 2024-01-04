//
//1. 요청객체 request를 불러오고 authorization header로부터토큰을가져옴
//2. authService.extreacTokenFromHeader를 이용해서 사용할 수 있는 형태의 토큰 추출
//3. authService.decodeBasicToken을 실행해서 email과 password추출
//4. email과 password를 이용해서 사용자를 가여좀
//   authService.authenticateWithEmailAndPassword
//5. 찾아낸 사용자를 1 요청객체에 붙여준다.
// req.user = user;
//요청이 응답으로 나가기직전까지

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

//pipe를 구현하는것과 매우 유사함
@Injectable()
export class BasicTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //false일떄는 guard를 통과하지 못함
    //switchToHttp,switchToRPC, switchToWs 종류별로
    //요청객체 가져옴
    console.log('context::', context);
    console.log('context.switchToHttp::', context.switchToHttp());
    const req = context.switchToHttp().getRequest();

    const rawToken = req.headers['authorization'];

    if (!rawToken) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    const token = this.authService.extractTokenFormHeader(rawToken, false);

    const { email, password } = this.authService.decodeBasicToken(token);

    const user = await this.authService.authenticateWithEmailAndPassword({
      email,
      password,
    });
    //req는 응답으로 돌아갈떄 까지 생명이 살아있음
    req.user = user;

    return true;
  }
}
