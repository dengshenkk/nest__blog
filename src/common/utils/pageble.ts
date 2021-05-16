import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class Pageable {
  pageNum: number;
  pageSize: number;

  /**
   *
   * @param pageNum
   * @param pageSize
   */
  constructor({ pageNum, pageSize }: { pageNum: number; pageSize: number }) {
    this.pageNum = +pageNum;
    this.pageSize = +pageSize;
  }

  computedCurrentPage() {
    return this.pageSize * (this.pageNum - 1);
  }

  /**
   * 获取分页后的数据和条数
   * @param query
   */
  async getDataAndCount(query) {
    const data = await query.getMany();
    const count = await query.getCount();
    return { data, count };
  }
}

export class PageDto {
  @IsString()
  @IsNotEmpty({ message: 'pageNum不能为空' })
  @ApiProperty({title: '分页', example: 1 })
  pageNum: number;


  @IsDefined({ message: '参数必填' })
  @IsNotEmpty({ message: 'pageSize不能为空' })
  @ApiProperty({title: '页码', example: 20})
  pageSize: number;
}
