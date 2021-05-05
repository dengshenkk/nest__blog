import { Module } from '@nestjs/common';
import { ValidationPipe } from '@/common/validate/validate.pipe';

@Module({
  imports: [ValidationPipe],
  providers: [ValidationPipe],
  exports: [ValidationPipe],
})
export class ValidateModule {}
