import { createParamDecorator } from '@nestjs/common';

export const PageParam = createParamDecorator((data, req) => {
  console.log('data: ', data);
  console.log('req: ', req);
  return req;
});
