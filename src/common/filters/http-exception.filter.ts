import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import * as dayjs from 'dayjs';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    console.log(JSON.stringify(exception, null, 4));
    const { status, errorCode, errorMessage } = exception;
    response.status(status).json({
      success: false,
      code: errorCode,
      message: '操作失败: ' + errorMessage,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      body: Object.keys(request.body).length ? request.body : request.params,
    });
  }
}
