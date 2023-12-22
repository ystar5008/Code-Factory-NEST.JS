import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  constructor(private readonly httpService: HttpService) {}

  async findAllhealth() {
    const { data } = await firstValueFrom(
      this.httpService.get('http://localhost:3000/health').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}
