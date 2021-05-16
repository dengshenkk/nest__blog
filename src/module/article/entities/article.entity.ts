import { BaseEntity } from '@/common/entity/baseEntity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CategoryEntity } from '@/module/category/entities/category.entity';
import { TagEntity } from '@/module/tag/entities/tag.entity';
import { CommentEntity } from '@/module/comment/entities/comment.entity';

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

  @Column()
  views: number = 0;

  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @ManyToMany(() => TagEntity)
  @JoinTable()
  tags: TagEntity[];

  @OneToMany(() => ArticleEntity, (article) => article.comments)
  @JoinColumn()
  comments: CommentEntity[];
}
