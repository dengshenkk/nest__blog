import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from '@/module/user/dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserEntity } from '@/module/user/entities/user.entity';
import { UserRegisterDto } from "@/module/user/dto/user-register.dto";

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/login')
  async create(@Body() userLoginDto: UserLoginDto) {
    console.log('userLoginDto: ', userLoginDto);
    return await this.userService.login(userLoginDto);
  }

  @Post('/register')
  async register(@Body() user: UserRegisterDto) {
    return await this.userService.register(user);
  }
}
