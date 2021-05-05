import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BusinessException } from '@/common/exception/businessException';
import { ErrorCode } from '@/common/enums/errorCode';
import { ErrorMsg } from '@/common/enums/errorMsg';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    console.log(`value:`, value, 'metatype: ', metatype);
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log('errors: ', errors);
      const { property, constraints } = errors[0]; // 只需要取第一个错误信息并返回即可
      throw new BusinessException({
        errorCode: ErrorCode.PARAM_INVALID,
        errorMessage: ErrorMsg.PARAM_INVALID,
        description: property + Object.values(constraints),
      });
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
