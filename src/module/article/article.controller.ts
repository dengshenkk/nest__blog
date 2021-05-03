import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pageable } from '@/common/utils/pageble';

@ApiTags('文章')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articleService.create(createArticleDto);
  }

  @Get('/page')
  @ApiQuery({ name: 'pageNum', example: 1 })
  @ApiQuery({ name: 'pageSize', example: 20 })
  async findAll(@Query('pageNum') pageNum, @Query('pageSize') pageSize) {
    return await this.articleService.findByPage(
      new Pageable({ pageNum, pageSize }),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
