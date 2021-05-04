import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/common/entity/baseEntity';

@Entity('t_user')
export class UserEntity extends BaseEntity {
  @Column({ nullable: false })
  username: string;

  @Column({ select: false, nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column()
  phone: string;

  @Column()
  avatar: string;
}
