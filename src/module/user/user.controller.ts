import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from '@/module/user/dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserRegisterDto } from '@/module/user/dto/user-register.dto';
import { RedisService } from '@/common/cache/redis/redis.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('用户')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly redisService: RedisService,
  ) {}

  @Post('/login')
  async login(@Body() userLoginDto: UserLoginDto) {
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
  async getUserInfo(@Req() req) {
    const sign = 'Bearer ';
    const token = req.headers.authorization.slice(sign.length);
    const user = await this.redisService.get(token);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
