import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from '@/module/tag/entities/tag.entity';
import { Repository } from 'typeorm';

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
    await this.tagRepository.save(createTagDto);
  }

  findAll() {
    return `This action returns all tag`;
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

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
