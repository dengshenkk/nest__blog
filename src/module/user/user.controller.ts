import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from '@/module/user/dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from '@/module/user/dto/user-register.dto';
import { AuthGuard } from '@nestjs/passport';

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
  // @UseGuards(AuthGuard('jwt'))
  async register(@Body() user: UserRegisterDto) {
    return await this.userService.register(user);
  }

  @Post('/userinfo')
  @UseGuards(AuthGuard('jwt'))
  async getUserInfo(@Body() user: UserRegisterDto) {
    return await this.userService.findOne({ email: user.email });
  }
}
