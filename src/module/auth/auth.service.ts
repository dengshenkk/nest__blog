import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '@/module/user/dto/user-login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(userLoginDto: UserLoginDto) {
    return {
      access_token: await this.jwtService.sign({ ...userLoginDto }),
    };
  }
}
