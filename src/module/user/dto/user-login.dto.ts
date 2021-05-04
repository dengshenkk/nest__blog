import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @IsEmail()
  @ApiProperty({ title: '邮箱', example: 'dengshenkk@gmail.com' })
  email: string;

  @IsString()
  @ApiProperty({ title: '密码', example: '12345678' })
  password: string;
}
