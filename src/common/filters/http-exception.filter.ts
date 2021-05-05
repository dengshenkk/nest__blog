import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { status, errorCode, errorMessage } = exception;
    response.status(status || 400).json({
      success: false,
      code: errorCode || exception.status || 500,
      message: '操作失败: ' + (errorMessage || exception.message || exception),
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      body: Object.keys(request.body).length ? request.body : request.params,
    });
  }
}
