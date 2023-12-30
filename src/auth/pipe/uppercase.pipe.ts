import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.length <= 0) {
      throw new BadRequestException('입력된 값이 없습니다.');
    }

    return value.toUpperCase();
  }
}
