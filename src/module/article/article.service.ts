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

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const category = await this.categoryService.findOne(
      createArticleDto.categoryId,
    );
    const tags = await this.tagService.findByIds(createArticleDto.tagIds);
    const article = Object.assign(new ArticleEntity(), createArticleDto);
    article.category = category;
    article.tags = tags;
    await this.articleRepository.save(article);
    return null;
  }

  async findByPage(pageable: Pageable) {
    pageable.pageNum = pageable.pageNum - 1;

    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tags', 'tag')
      .skip(pageable.pageSize * pageable.pageNum + +pageable.pageNum)
      .take(pageable.pageSize);
    const data = await queryBuilder.getMany();
    const count = await queryBuilder.getCount();
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

    return await queryBuilder.getOne();
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
    // TODO : 太晚了 明天在实现
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
