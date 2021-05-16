import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '@/module/tag/entities/tag.entity';
import { Repository } from 'typeorm';
import { Pageable } from '@/common/utils/pageble';
import { BusinessException } from '@/common/exception/businessException';
import { ErrorMsg } from '@/common/enums/errorMsg';
import { ErrorCode } from '@/common/enums/errorCode';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: Repository<TagEntity>,
  ) {
    this.init();
  }

  async init() {
    const name = await this.findOneByTagName('测试');
    !name && (await this.tagRepository.save(new CreateTagDto('测试')));
  }

  async create(createTagDto: CreateTagDto) {
    const find = await this.findByName(createTagDto.name);
    if (find) {
      throw new BusinessException({
        errorMessage: ErrorMsg.DATA_EXISTS,
        errorCode: ErrorCode.DATA_EXISTS,
        description: 'name',
      });
    }
    return await this.tagRepository.save(createTagDto);
  }

  async findAll() {
    return await this.tagRepository.find();
  }

  async findAllByPage(pageable: Pageable) {
    const query = this.tagRepository
      .createQueryBuilder('tag')
      .skip(pageable.computedCurrentPage())
      .take(pageable.pageSize);
    const { data, count } = await pageable.getDataAndCount(query);
    return {
      data,
      count,
    };
  }

  async findByName(name: string) {
    return await this.tagRepository.findOne({
      name,
    });
  }

  async findOne(id: string) {
    return await this.tagRepository.findOne(id);
  }

  async findByIds(ids: string[]) {
    return await this.tagRepository.findByIds(ids);
  }

  async findOneByTagName(tagName: string) {
    return await this.tagRepository.findOne({
      name: tagName,
    });
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    const one = await this.findOne(id);
    if (!one) {
      throw new BusinessException({
        errorCode: ErrorCode.DATA_NOT_EXISTS,
        errorMessage: ErrorMsg.DATA_NOT_EXISTS,
        description: 'id',
      });
    }
    await this.tagRepository.save(Object.assign(one, updateTagDto));
    return {
      id,
    };
  }

  async remove(id: string) {
    const one = await this.findOne(id);
    if (!one) {
      throw new BusinessException({
        errorCode: ErrorCode.DATA_NOT_EXISTS,
        errorMessage: ErrorMsg.DATA_NOT_EXISTS,
        description: 'id',
      });
    }
    await this.tagRepository.softRemove(one);
    return {};
  }
}
