import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({ title: '标签名' })
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}
