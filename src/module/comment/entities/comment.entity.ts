import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@/common/entity/baseEntity';
import { ArticleEntity } from '@/module/article/entities/article.entity';

@Entity('t_comment')
export class CommentEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  // todo 审核功能
  // @Column({ type: 'enum' })
  // status: 'checked' | 'unchecked';

  @ManyToOne(() => CommentEntity)
  @JoinColumn()
  article: ArticleEntity;
}
