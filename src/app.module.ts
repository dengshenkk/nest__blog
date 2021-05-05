import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './module/article/article.module';
import { CategoryModule } from './module/category/category.module';
import { TagModule } from './module/tag/tag.module';
import { CommentModule } from './module/comment/comment.module';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';
import { RedisModule } from '@/common/cache/redis/redis.module';
import { MysqlModule } from '@/common/repository/typeorm/mysql.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ArticleModule,
    CategoryModule,
    TagModule,
    CommentModule,
    UserModule,
    AuthModule,
    MysqlModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
