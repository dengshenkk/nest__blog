import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class InterceptorResponse implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const statusCode = response.statusCode;
        const url = request.originalUrl;
        return {
          statusCode,
          url,
          msg: '操作成功',
          success: true,
          data,
        };
      }),
    );
  }
}
