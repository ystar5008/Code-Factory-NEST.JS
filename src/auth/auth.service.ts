import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersModel } from 'src/users/entities/users.entity';
import { HASH_ROURDS, JWT_SECRET } from './const/auth.const';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    //authmodule에서 jwtModule을 import해줬기 때문에 service에서 사용가능 주입가능
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  extractTokenFormHeader(header: string, isBearer: boolean) {
    //[Basic, {token}]
    //[Bearer, {token}]
    const splitToken = header.split(' ');

    const prefix = isBearer ? 'Bearer' : 'Basic';

    if (splitToken.length !== 2 || splitToken[0] !== prefix) {
      throw new UnauthorizedException('wrong token');
    }

    const token = splitToken[1];

    return token;
  }

  decodeBasicToken(base64String: string) {
    const decoded = Buffer.from(base64String, 'base64').toString('utf8');

    const split = decoded.split(':');

    if (split.length !== 2) {
      throw new UnauthorizedException('wrong token');
    }

    const email = split[0];
    const password = split[1];

    return {
      email,
      password,
    };
  }
  //기능정리
  //1) registerWithEmail => 이메일 회원가입 함수
  // - email, nickname, password
  // - accessToken, refreshToken 반환

  //2) loginWithEmail
  // - email, password입력 사용자 검증 ,로그인
  // - 검증이 완료되면 accessToken, refreshToken 반환

  //3) loginIser
  // - 1과 2에서 필요한 accessToken과 refreshToken을 반환하는 로직

  //4) signToken
  // - 3에서 필요한 accessToken과 refreshToken을 sign하는 로직

  //5) authenticatteWithEmailAndPassword
  // - 2에서 로그인을 진행할떄 필요한 기본적인 검증
  // - 사용자가 존재하는지 확인 (email)
  // - 비밀번호 검증
  // - 검증완료시 사용자 정보 반환
  // - loginWithEmail에서 반환된 데이터를 기반으로 토큰생성

  //payload에 들어갈 정보
  //email
  //sub -> id
  //type : "acess" | "refresh"
  signToken(user: Pick<UsersModel, 'email' | 'id'>, isRefreshToken: boolean) {
    const payload = {
      email: user.email,
      sub: user.id,
      type: isRefreshToken ? 'refresh' : 'acess',
    };

    //pay로드 암호화
    return this.jwtService.sign(payload, {
      //시크릿키
      secret: JWT_SECRET,
      //토큰 만료시간, 초단위 ? 1시간 : 5분
      expiresIn: isRefreshToken ? 3600 : 300,
    });
  }

  loginUser(user: Pick<UsersModel, 'email' | 'id'>) {
    //this.logger.log(`loginUser 로그인시도::${user} `);
    return {
      accessToken: this.signToken(user, false),
      refreshToken: this.signToken(user, true),
    };
  }

  async authenticateWithEmailAndPassword(
    user: Pick<UsersModel, 'email' | 'password'>,
  ) {
    //사용자검증
    //비밀번호검증
    //사용자 정보 반환

    const exixtingUser = await this.usersService.getUserByEmail(user.email);

    if (!exixtingUser) {
      throw new UnauthorizedException('not registed user');
    }

    //입력된 비밀번호, 해시로 저장된 비밀번호를 비교함
    const passOK = await bcrypt.compare(user.password, exixtingUser.password);

    if (!passOK) {
      throw new UnauthorizedException('wrong password');
    }

    return exixtingUser;
  }

  async loginWithEmail(user: Pick<UsersModel, 'email' | 'password'>) {
    const exitingUser = await this.authenticateWithEmailAndPassword(user);

    return this.loginUser(exitingUser);
  }
  async registerWithEmail(
    user: Pick<UsersModel, 'nickname' | 'email' | 'password'>,
  ) {
    //비밀번호 암호화, 비밀번호, 암호화 돌릴 횟수
    const hash = await bcrypt.hash(user.password, HASH_ROURDS);

    const newUser = await this.usersService.createUser({
      ...user,
      password: hash,
    });

    return this.loginUser(newUser);
  }
}
