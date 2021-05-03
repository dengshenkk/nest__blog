import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as dayjs from 'dayjs';
import { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions';
import { applyDecorators } from '@nestjs/common';
import { ColumnWithWidthOptions } from 'typeorm/decorator/options/ColumnWithWidthOptions';
import { Transform } from 'class-transformer';

export const TimestampTransformer = {
  from: (value: number): Date => {
    return new Date(+value);
  },
  to: (value: Date) => {
    if (!value) return value;
    return value.getTime();
  },
};

export const Timestamp = (
  options?: ColumnCommonOptions & ColumnWithWidthOptions,
) => {
  const transformer = Transform(({ value, type }) => {
    if (value)
      return type === 1
        ? (value as Date).getTime()
        : type === 0
        ? new Date(value)
        : value;
  });
  if (!options) return applyDecorators(transformer);
  return applyDecorators(
    Column(
      'bigint',
      Object.assign({}, options, {
        transformer: options.transformer
          ? options.transformer instanceof Array
            ? options.transformer.push(TimestampTransformer)
            : [options.transformer, TimestampTransformer]
          : TimestampTransformer,
      }),
    ),
    transformer,
  );
};

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

  @CreateDateColumn()
  @Timestamp()
  createAt: Date;

  // @Timestamp()
  @UpdateDateColumn()
  @Timestamp()
  updateAt: Date;

  // 不返回该列
  @DeleteDateColumn({ select: false })
  @Timestamp()
  deleteAt: Date;
}
