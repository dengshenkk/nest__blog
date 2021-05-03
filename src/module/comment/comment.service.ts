import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '@/module/comment/entities/comment.entity';
import { Repository } from 'typeorm';
import { ArticleService } from '../article/article.service';
import { BusinessException } from '@/common/exception/businessException';
import { ErrorCode } from '@/common/enums/errorCode';
import { ErrorMsg } from '@/common/enums/errorMsg';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    private readonly articleService: ArticleService,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    const article = await this.articleService.findOne(
      createCommentDto.articleId,
    );
    const { title, content } = createCommentDto;
    const param = { title, content, article };
    return await this.commentRepository.save(param);
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async findOne(id: string) {
    const find = await this.commentRepository.findOne(id);
    if (!find) {
      throw new BusinessException({
        errorCode: ErrorCode.DATA_NOT_EXISTS,
        errorMessage: ErrorMsg.DATA_NOT_EXISTS,
        description: 'id',
      });
    }
    return find;
  }

  async update(id: string, updateCommentDto: UpdateCommentDto) {
    const one = await this.findOne(id);
    return await this.commentRepository.save(
      Object.assign(one, updateCommentDto),
    );
  }

  async remove(id: string) {
    const find = await this.findOne(id);
    await this.commentRepository.softRemove(find);
    return {};
  }
}
