import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@/module/user/entities/user.entity';
import { AuthModule } from '@/module/auth/auth.module';
import { RedisModule } from '@/common/cache/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AuthModule, RedisModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
