import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/module/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/module/auth/constants';
import { JwtStrategy } from '@/module/auth/jwt.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
