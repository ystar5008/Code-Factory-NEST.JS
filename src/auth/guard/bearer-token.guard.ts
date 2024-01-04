import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/users/users.service';

//Guard를 작성할때는 CanActivate 클래스 implements
//implements는 특정한 인터페이스를 따르도록 클래스가 구현되었음을 보장하기 위해 사용
@Injectable()
export class BearerTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly usersServcie: UsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const rawToken = req.headers['authorization'];

    if (!rawToken) {
      throw new UnauthorizedException('토큰이 없습니다');
    }

    const token = await this.authService.extractTokenFormHeader(rawToken, true);

    const result = await this.authService.verifyToken(token);
    //사용자 정보 - user
    //token - token
    //tokenType - access | refresh
    const user = await this.usersServcie.getUserByEmail(result.email);

    req.token = token;
    req.tokenType = result.Type;
    req.user = user;

    return true;
  }
}

@Injectable()
//extends는 클래스가 다른 클래스를 상속할 떄 사용
//AccessTokenGuard클래스는 BearerTokenGuard를 상속받음
//AccessTokenGuard도 CanActivate의 규약을 따름 재사용성
//AccessTokenGuard는 BearerTokenGuard에서 정의된 기능을 상속받음
export class AccessTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //super는 하위 클래스에서 상위클래스의 메서드를 호출할떄 사용
    //AccesstokenGuard 클래스의 canActive 메서드에서 super.canActivate(context)를 호출
    //=> BearerTokenGuard클래스의 canActivate메서드를 호출함
    //AccessTokenGuard는 BearerTokenGuard의 canActivate 로직을 사용하면서 추가적인 동작을 정의가능
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== 'access') {
      throw new UnauthorizedException('Access Token이 아닙니다.');
    }

    return true;
  }
}

@Injectable()
export class RefreshTokenGuard extends BearerTokenGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //super는 하위 클래스에서 상위클래스의 메서드를 호출할떄 사용
    //AccesstokenGuard 클래스의 canActive 메서드에서 super.canActivate(context)를 호출
    //=> BearerTokenGuard클래스의 canActivate메서드를 호출함
    //AccessTokenGuard는 BearerTokenGuard의 canActivate 로직을 사용하면서 추가적인 동작을 정의가능
    await super.canActivate(context);

    const req = context.switchToHttp().getRequest();

    if (req.tokenType !== 'refresh') {
      throw new UnauthorizedException('Refresh Token이 아닙니다.');
    }

    return true;
  }
}
