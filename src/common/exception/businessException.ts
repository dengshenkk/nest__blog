import { HttpException } from '@nestjs/common';
import { ErrorCode } from '@/common/enums/errorCode';

export class BusinessException extends HttpException {
  private readonly errorMessage: string;
  private readonly errorCode: ErrorCode;

  /**
   * errorMessage: ErrorMsg | string,
   errorCode: ErrorCode,
   statusCode: HttpStatus = 200,
   */
  constructor({
    errorMessage,
    errorCode,
    description,
    statusCode = 200,
  }: {
    errorMessage: string;
    errorCode: number;
    description?: string;
    statusCode?: number;
  }) {
    super(errorMessage, statusCode);
    if (description) {
      this.errorMessage = `[${description}] ${errorMessage}`;
    } else {
      this.errorMessage = `${errorMessage}`;
    }
    this.errorCode = errorCode;
  }

  getErrorCode(): ErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
