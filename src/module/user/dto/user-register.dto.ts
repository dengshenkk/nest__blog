import { IsString } from 'class-validator';
import { UserLoginDto } from '@/module/user/dto/user-login.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto extends UserLoginDto {
  @IsString()
  @ApiProperty({ title: '用户名', example: 'jack' })
  username: string;

  @IsString()
  @ApiProperty({ title: '确认密码', example: '12345678' })
  repeatPassword: string;
}
