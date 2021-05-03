import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@/module/category/entities/category.entity';
import { Repository } from 'typeorm';
import { BusinessException } from '@/common/exception/businessException';
import { ErrorMsg } from '@/common/enums/errorMsg';
import { ErrorCode } from '@/common/enums/errorCode';
import { Pageable } from '@/common/utils/pageble';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {
    this.init();
  }

  async init() {
    const name = await this.findOneByCategoryName('测试');
    !name &&
      (await this.categoryRepository.save(new CreateCategoryDto('测试')));
  }

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findAllByPage(pageable: Pageable) {
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .skip(pageable.computedCurrentPage())
      .take(pageable.pageSize);
    const data = await query.getMany();
    const count = await query.getCount();
    return {
      data,
      count,
    };
  }

  async findOne(id: string) {
    const result = await this.categoryRepository.findOne(id);
    if (!result) {
      throw new BusinessException({
        errorCode: ErrorCode.PARAM_INVALID,
        errorMessage: ErrorMsg.PARAM_INVALID,
        description: 'categoryId',
      });
    }
    return result;
  }

  async findOneByCategoryName(categoryName: string) {
    return await this.categoryRepository.findOne({
      name: categoryName,
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const one = await this.findOne(id);
    if (!one) {
      throw new BusinessException({
        errorCode: ErrorCode.PARAM_INVALID,
        errorMessage: ErrorMsg.PARAM_INVALID,
        description: 'id',
      });
    }
    await this.categoryRepository.save(Object.assign(one, updateCategoryDto));
    return {
      id,
    };
  }

  async remove(id: string) {
    const one = await this.findOne(id);
    if (!one) {
      throw new BusinessException({
        errorMessage: ErrorMsg.PARAM_INVALID,
        errorCode: ErrorCode.PARAM_INVALID,
        description: 'id',
      });
    }
    await this.categoryRepository.softRemove(one);
    return {};
  }
}
