import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class PasswordPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    console.log(metadata);
    if (value.toString().length > 8) {
      throw new BadRequestException('비밀번호는 8자 이하로 입력해주세요');
    }
    return value.toString();
  }
}

@Injectable()
export class MaxLengthPipe implements PipeTransform {
  constructor(private readonly length: number) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (value.toString().length > this.length) {
      throw new BadRequestException(
        `최대길이는 ${this.length}입니다. 입력된 값의 길이는 ${value.length} 입니다`,
      );
    }

    return value.toString();
  }
}

@Injectable()
export class MinLengthPiepe implements PipeTransform {
  constructor(private readonly length: number) {
    length = this.length;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (value.toString().length < this.length) {
      throw new BadRequestException(
        `최소 길이는 ${this.length} 입니다. 입력된 값의 길이는 ${value.length} 입니다`,
      );
    }

    return value.toString();
  }
}
