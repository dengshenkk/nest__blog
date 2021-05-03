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
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pageable } from '@/common/utils/pageble';

@ApiTags('标签')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Get('/all')
  findAll() {
    return this.tagService.findAll();
  }

  @Get('/page')
  @ApiQuery({ name: 'pageSize', example: 20 })
  @ApiQuery({ name: 'pageNum', example: 1 })
  findAllByPage(@Query('pageSize') pageSize, @Query('pageNum') pageNum) {
    return this.tagService.findAllByPage(new Pageable({ pageNum, pageSize }));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(id);
  }
}
