import { Table as BaseTable, TableProps as BaseTableProps } from 'antd';
import { twMerge } from 'tailwind-merge';

import Icon from '../icons/icon';

import cls from './table.module.scss';

export interface TableProps<RecordType> extends BaseTableProps<RecordType> {
  emptyComponent?: React.ReactNode;
  borderBottom?: boolean;
  wrapperClassName?: string;
}

function Table<RecordType extends object>(props: TableProps<RecordType>) {
  const prevIcon = (
    <div className={twMerge(cls['pagination-prev'], 'flex items-center gap-1')}>
      <Icon name="up" classNameIcon="w-[14px] h-auto rotate-[-90deg]" />
      Previous
    </div>
  );
  const nextIcon = (
    <div className={twMerge(cls['pagination-next'], 'flex items-center gap-1')}>
      Next
      <Icon name="up" classNameIcon="w-[14px] h-auto rotate-90" />
    </div>
  );

  return (
    <div data-cy="wrapper" className={twMerge(cls.wrapper, props.borderBottom && cls.border, props.wrapperClassName)}>
      <BaseTable {...props} pagination={props.pagination ? { prevIcon, nextIcon, ...props.pagination } : false} />
    </div>
  );
}

export default Table;
