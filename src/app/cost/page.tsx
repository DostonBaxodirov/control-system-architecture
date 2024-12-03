'use client';

import { FC, useState } from 'react';
import dayjs from 'dayjs';

import { Button, CurrencySelect, Main } from '~/components';
import Table from '~/components/table/table';
import { useAuth } from '~/hooks';
import { useCosts } from '~/modules/cost/hooks';

import CreateCost from './_components/create-cost';

const Plan: FC = () => {
  const { isLoading, costs } = useCosts();
  const { currentProject } = useAuth();
  const [open, setOpen] = useState(false);

  if (isLoading) return <div className=" flex h-screen w-full items-center justify-center text-3xl font-medium">Loading...</div>;
  return (
    <Main>
      <div className="flex w-full items-center justify-between p-3">
        <p className="text-lg font-medium">Xarajatlar</p>
        <div className=" flex w-max gap-2">
          <CurrencySelect />
          <Button disabled={currentProject.isEnded} intent="default" size="sm" className="w-max" onClick={() => setOpen(true)}>
            Qo'shish
          </Button>
        </div>
      </div>
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
      <CreateCost open={open} setOpen={setOpen} />
    </Main>
  );
};

export default Plan;
