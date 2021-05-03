import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/module/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from '@/module/user/dto/user-login.dto';
import { BusinessException } from '@/common/exception/businessException';
import { ErrorMsg } from '@/common/enums/errorMsg';
import { ErrorCode } from '@/common/enums/errorCode';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.init();
  }

  async init() {
    const user = await this.userRepository.findOne({
      email: 'dengshenkk@gmail.com',
    });
    console.log('user: ', user);
    if (!user) {
      const user = new UserEntity();
      user.username = 'dengshen';
      user.password = '12345678';
      user.avatar = '//xxxx.com/xxx.png';
      user.phone = '1388888888';
      user.email = 'dengshenkk@gmail.com';
      await this.userRepository.save(user);
      Logger.debug('用户初始化成功');
    }
  }

  async login(userLoginDto: UserLoginDto) {
    const find = await this.userRepository.findOne({
      email: userLoginDto.email,
      password: userLoginDto.password,
    });
    if (!find) {
      throw new BusinessException({
        errorMessage: ErrorMsg.DATA_NOT_EXISTS,
        errorCode: ErrorCode.DATA_NOT_EXISTS,
        description: 'email/password',
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = find;
    return result;
  }
}
