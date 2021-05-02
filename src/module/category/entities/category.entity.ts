import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '@/common/entity/baseEntity';
import { ArticleEntity } from '@/module/article/entities/article.entity';

@Entity('t_category')
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => ArticleEntity, (article) => article.category)
  @JoinColumn({ name: 'id' })
  articles: ArticleEntity[];
}
