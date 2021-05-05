import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@/module/article/entities/article.entity';
import { CategoryModule } from '@/module/category/category.module';
import { TagModule } from '@/module/tag/tag.module';
import { RedisModule } from '@/common/cache/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    CategoryModule,
    TagModule,
    RedisModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
