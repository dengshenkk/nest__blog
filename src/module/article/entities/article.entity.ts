import { BaseEntity } from '@/common/entity/baseEntity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CategoryEntity } from '@/module/category/entities/category.entity';
import { TagEntity } from '@/module/tag/entities/tag.entity';

@Entity('t_article')
export class ArticleEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  content: string;

  @Column()
  status: string;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @ManyToMany(() => TagEntity)
  @JoinTable()
  tags: TagEntity[];
}
