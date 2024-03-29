import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '@/module/article/entities/article.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '@/module/category/category.service';
import { TagService } from '@/module/tag/tag.service';
import { Pageable } from '@/common/utils/pageble';
import { BusinessException } from '@/common/exception/businessException';
import { ErrorMsg } from '@/common/enums/errorMsg';
import { ErrorCode } from '@/common/enums/errorCode';
import { RedisService } from '@/common/cache/redis/redis.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
    private readonly redisService: RedisService,
  ) { }

  async create(createArticleDto: CreateArticleDto) {
    const category = await this.categoryService.findOne(
      createArticleDto.categoryId,
    );
    const tags = await this.tagService.findByIds(createArticleDto.tagIds);
    const article = Object.assign(new ArticleEntity(), createArticleDto);
    article.category = category;
    article.tags = tags;
    const result = await this.articleRepository.save(article);
    return { id: result.id }
  }

  async findByPage(pageable: Pageable) {
    const cache = await this.redisService.get(
      pageable.pageNum + '-' + pageable.pageSize,
    );
    if (cache) {
      return cache;
    }
    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
      .skip(pageable.computedCurrentPage())
      .take(pageable.pageSize);
    const data = await queryBuilder.getMany();
    const count = await queryBuilder.getCount();
    await this.redisService.set(pageable.pageNum + '-' + pageable.pageSize, {
      data,
      count,
    });
    return {
      data,
      count,
    };
  }

  async findOne(id: string) {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
      .where('article.id = :id', { id });

    const result = await queryBuilder.getOne();
    if (!result) {
      throw new BusinessException({
        errorMessage: ErrorMsg.DATA_NOT_EXISTS,
        errorCode: ErrorCode.DATA_NOT_EXISTS,
        description: 'id',
      });
    }
    await this.updateView(result)
    return result;
  }

  async updateView(article: ArticleEntity) {
    article.views++
    const result = await this.articleRepository.save(article)
    console.log(result);
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    const one = await this.findOne(id);
    if (!one) {
      throw new BusinessException({
        errorMessage: ErrorMsg.PARAM_INVALID,
        errorCode: ErrorCode.PARAM_INVALID,
        description: 'articleId',
      });
    }
    await this.articleRepository.save(Object.assign(one, updateArticleDto));
    return { id };
  }

  async remove(id: string) {
    const one = await this.findOne(id);
    if (!one) {
      throw new BusinessException({
        errorCode: ErrorCode.PARAM_INVALID,
        errorMessage: ErrorMsg.PARAM_INVALID,
        description: 'id',
      });
    }
    return await this.articleRepository.softRemove(one);
  }
}
