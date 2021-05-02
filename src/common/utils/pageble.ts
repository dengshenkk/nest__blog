export class Pageable {
  pageNum: number;
  pageSize: number;

  constructor(pageNum: number, pageSize: number) {
    this.pageNum = pageNum;
    this.pageSize = pageSize;
  }
}
