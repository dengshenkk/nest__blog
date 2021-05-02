import { BaseEntity } from '@/common/entity/baseEntity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CategoryEntity } from '@/module/category/entities/category.entity';

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
}
