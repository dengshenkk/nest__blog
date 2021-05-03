import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';

export const transformer = {
  to(value: any): any {
    return dayjs(value).valueOf();
  },
  from(value: any): any {
    return dayjs(value).valueOf();
  },
};

@Entity()
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ transformer })
  createAt: Date;

  // @Timestamp()
  @UpdateDateColumn({ transformer })
  updateAt: Date;

  // 不返回该列
  @DeleteDateColumn({ transformer, select: false })
  deleteAt: Date;
}
