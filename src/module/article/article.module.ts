import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '@/module/article/entities/article.entity';
import { CategoryModule } from '@/module/category/category.module';
import { TagModule } from '@/module/tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    CategoryModule,
    TagModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
