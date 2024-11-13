'use client';

import { FC, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { Button, CurrencySelect, Main } from '~/components';
import Table from '~/components/table/table';
import Tag from '~/components/tag/tag';
import usePlans from '~/modules/plans/hooks/use-plans';

import { CreatePlan, CreateSubPlan } from './_components';

const Plan: FC = () => {
  const { plans, isLoading } = usePlans();
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState(false);

  if (isLoading) return <div className=" flex h-screen w-full items-center justify-center text-3xl font-medium">Loading...</div>;
  return (
    <Main>
      <div className="flex w-full items-center justify-between p-3">
        <p className="text-lg font-medium">Smeta</p>
        <div className=" flex w-max gap-2">
          <CurrencySelect />
          <Button intent="default" size="sm" className="w-max" onClick={() => setOpen(true)}>
            Qo'shish
          </Button>
          <Button intent="default" size="sm" className="w-max" onClick={() => setOpenSub(true)}>
            Reja Qo'shish
          </Button>
        </div>
      </div>
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
      <CreatePlan open={open} setOpen={setOpen} />
      <CreateSubPlan open={openSub} setOpen={setOpenSub} />
    </Main>
  );
};

export default Plan;
