import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@/module/category/entities/category.entity';
import { Repository } from 'typeorm';

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

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  findOne(id: string) {
    return this.categoryRepository.findOne(id);
  }

  async findOneByCategoryName(categoryName: string) {
    return await this.categoryRepository.findOne({
      name: categoryName,
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
