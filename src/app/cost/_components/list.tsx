'use client';

import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';

import { Table, TableSkeleton } from '~/components';
import { useCosts } from '~/modules/cost/hooks';

const List = () => {
  const searchParams = useSearchParams();
  const { isLoading, costs } = useCosts({ name: searchParams.get('costName') || '', planId: searchParams.get('planId') || '' });

  return isLoading ? (
    <TableSkeleton />
  ) : (
    <Table
      dataSource={costs}
      columns={[
        {
          title: 'Nomi',
          key: 'name',
          dataIndex: 'name'
        },
        {
          title: 'Yaratilish vaqti',
          key: 'createdAt',
          dataIndex: 'createdAt',
          render: createdAt => <p>{dayjs(createdAt).format('DD.MM.YYYY')}</p>
        },
        {
          title: 'Qiymati',
          key: 'amount',
          dataIndex: 'amount',
          render: (amount, record) => (
            <p>
              {amount} {record.currency}
            </p>
          )
        },
        {
          title: 'Sabab',
          key: 'reason',
          dataIndex: 'reason'
        },
        {
          title: 'Turi',
          key: 'type',
          dataIndex: 'type'
        }
      ]}
    />
  );
};

export default List;
