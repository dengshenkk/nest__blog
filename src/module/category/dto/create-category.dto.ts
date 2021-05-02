import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ title: '分类' })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
