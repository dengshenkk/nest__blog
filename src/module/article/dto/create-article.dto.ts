import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty()
  title: string;
  @ApiProperty()
  summary: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  status: string;
  @ApiProperty()
  categoryId: string;
  @ApiProperty()
  tagIds: string[];
}
