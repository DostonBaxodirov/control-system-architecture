'use client';

import { FC } from 'react';
import dayjs from 'dayjs';
import { useRouter, useSearchParams } from 'next/navigation';

import { Table, TableSkeleton } from '~/components';
import Tag from '~/components/tag/tag';
import { usePlans } from '~/modules/plans/hooks';

const List: FC = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { plans, isLoading } = usePlans({ status: searchParams.get('status') || '', name: searchParams.get('planName') || '' });

  return isLoading ? (
    <TableSkeleton />
  ) : (
    <Table
      dataSource={plans}
      onRow={(record, rowIndex) => ({
        onClick: () => push(`/plan/${record.id}`)
      })}
      columns={[
        {
          title: 'Nomi',
          key: 'name',
          dataIndex: 'name'
        },
        {
          title: 'Yaratilgan vaqti',
          key: 'createdAt',
          dataIndex: 'createdAt',
          render: createdAt => <p>{dayjs(createdAt).format('DD.MM.YYYY')}</p>
        },
        {
          title: 'Davomiyligi',
          key: 'duration',
          dataIndex: 'duration'
        },
        {
          title: 'Umumiy qiymat',
          key: 'totalAmount',
          dataIndex: 'totalAmount',
          render: (totalAmount, record) => (
            <p>
              {totalAmount} {record.currency}
            </p>
          )
        },
        {
          title: 'Rejalar soni',
          key: 'countOfSubPlan',
          dataIndex: 'countOfSubPlan',
          render: countOfSubPlan => <p>{countOfSubPlan} ta</p>
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: status => <Tag color={status.variant}>{status.label}</Tag>
        }
      ]}
    />
  );
};

export default List;
