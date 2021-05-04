import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/module/user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from '@/module/user/dto/user-login.dto';
import { BusinessException } from '@/common/exception/businessException';
import { ErrorMsg } from '@/common/enums/errorMsg';
import { ErrorCode } from '@/common/enums/errorCode';
import { encryptPassword } from '@/common/utils/crypto';
import { UserRegisterDto } from '@/module/user/dto/user-register.dto';
import { AuthService } from '@/module/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {
    // this.init();
  }

  async init() {
    const user = await this.userRepository.findOne({
      email: 'dengshenkk@gmail.com',
    });
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

  async findOne({ email }) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async login(userLoginDto: UserLoginDto) {
    const findUser = await this.userRepository.findOne({
      where: {
        email: userLoginDto.email,
        password: encryptPassword(userLoginDto.password),
      },
    });
    if (!findUser) {
      throw new BusinessException({
        errorMessage: ErrorMsg.DATA_NOT_EXISTS,
        errorCode: ErrorCode.DATA_NOT_EXISTS,
        description: 'email/password',
      });
    }
    return await this.authService.login(findUser);
  }

  async register(user: UserRegisterDto) {
    if (user.password !== user.repeatPassword) {
      throw new BusinessException({
        errorMessage: ErrorMsg.PARAM_INVALID,
        errorCode: ErrorCode.PARAM_INVALID,
        description: 'password/repeatPassword',
      });
    }
    const findUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
    });
    if (findUser) {
      throw new BusinessException({
        errorMessage: ErrorMsg.DATA_EXISTS,
        errorCode: ErrorCode.DATA_EXISTS,
        description: 'email',
      });
    }
    user.password = encryptPassword(user.password);
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      password,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      repeatPassword,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      deleteAt,
      ...result
    } = await this.userRepository.save(user);
    return result;
  }
}
