/**
 *
 */
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
    const number = this.pageSize * (this.pageNum - 1);
    console.log('number: ', number);
    return number;
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
