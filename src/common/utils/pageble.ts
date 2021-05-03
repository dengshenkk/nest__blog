export class Pageable {
  pageNum: number;
  pageSize: number;

  constructor(pageNum: number, pageSize: number) {
    this.pageNum = +pageNum;
    this.pageSize = +pageSize;
  }

  computedCurrentPage() {
    const number = this.pageSize * (this.pageNum - 1);
    console.log('number: ', number);
    return number;
    // return this.pageNum * this.pageSize + this.pageSize;
  }
}
