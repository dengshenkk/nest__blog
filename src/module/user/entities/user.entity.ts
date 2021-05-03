import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/common/entity/baseEntity';

@Entity('t_user')
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  avatar: string;
}
