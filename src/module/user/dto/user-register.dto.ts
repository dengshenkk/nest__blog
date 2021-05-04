import { IsString } from 'class-validator';
import { UserLoginDto } from '@/module/user/dto/user-login.dto';

export class UserRegisterDto extends UserLoginDto {
  @IsString()
  username: string;

  @IsString()
  repeatPassword: string;
}
