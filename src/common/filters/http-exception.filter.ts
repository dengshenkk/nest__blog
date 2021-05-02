import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import dayjs from 'dayjs';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    // const status = exception.getStatus()
    console.log('exception: ', exception.message);
    const status = 200;
    response.status(status).json({
      success: false,
      statusCode: status,
      message: '操作失败: ' + exception.message,
      date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      path: request.url,
      body: Object.keys(request.body).length ? request.body : request.params,
    });
  }
}
