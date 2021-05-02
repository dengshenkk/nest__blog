import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from '@/module/article/entities/article.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '@/module/category/category.service';
import { TagService } from '@/module/tag/tag.service';

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
    console.log('article: ', article);
    return this.articleRepository.save(article);
  }

  async findAll() {
    return await this.articleRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
