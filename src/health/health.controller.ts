import { Controller, Get, Injectable } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly healthServcice: HealthService,
  ) {}

  @Get()
  @HealthCheck()
  check1() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }

  @Get('/myservice')
  @HealthCheck()
  check2() {
    return this.health.check([
      () =>
        this.http.responseCheck(
          'my-external-service',
          'https://youtube.com',
          (res) => res.status === 204,
        ),
    ]);
  }

  @Get('/diskcheck')
  @HealthCheck()
  check3() {
    return this.health.check([
      () =>
        //disk 헬스체크
        //검사이름 지정
        this.disk.checkStorage('storage', {
          //검사함 스토리지 경로 지정
          path: 'C:\\',
          //디스크의 임계값을 지정 1은 100%
          //message: "Used disk storage exceeded the set threshold"  사용 중인 디스크 저장소가 설정된 임계값을 초과했다는 내용입니다. 즉, 디스크의 사용량이 예상한 값보
          thresholdPercent: 1,
        }),
    ]);
  }

  @Get('directorycheck')
  @HealthCheck()
  check4() {
    return this.health.check([
      () =>
        this.disk.checkStorage('storage', {
          path: 'C:\\',
          threshold: 250 * 1024 * 1024 * 1024, //250GB
        }),
    ]);
  }

  @Get('findhealth')
  findHealth() {
    return this.healthServcice.findAllhealth();
  }
}
