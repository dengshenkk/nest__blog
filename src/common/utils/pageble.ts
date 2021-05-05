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
  pageNum: number;
  @IsNumber()
  @IsDefined({ message: '参数必填' })
  @IsNotEmpty({ message: 'pageSize不能为空' })
  pageSize: number;
}
