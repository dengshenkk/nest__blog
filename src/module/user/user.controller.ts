import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from '@/module/user/dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }
}
