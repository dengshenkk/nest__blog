import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/common/entity/baseEntity';

@Entity('t_tag')
export class TagEntity extends BaseEntity {
  @Column()
  name: string;
}
