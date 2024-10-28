'use client';

import { FC, useState } from 'react';

import { Button, Main } from '~/components';
import Table from '~/components/table/table';
import usePlans from '~/modules/plans/hooks/use-plans';

import CreatePlan from './_components/create-plan';

const Plan: FC = () => {
  const { plans, isLoading } = usePlans();
  const [open, setOpen] = useState(false);

  console.log('plans', plans);
  if (isLoading) return <div className=" flex h-screen w-full items-center justify-center text-3xl font-medium">Loading...</div>;
  return (
    <Main>
      <div className="flex w-full items-center justify-between p-3">
        <p className="text-lg font-medium">Smeta reja</p>
        <Button intent="default" size="sm" className="w-max" onClick={() => setOpen(true)}>
          Qo'shish
        </Button>
      </div>
      <Table
        dataSource={plans}
        columns={[
          {
            title: 'Id',
            key: 'ID',
            dataIndex: 'ID'
          },
          {
            title: 'Nomi',
            key: 'Name',
            dataIndex: 'Nam'
          },
          {
            title: 'Telefon raqami',
            key: 'PhoneNumber',
            dataIndex: 'PhoneNumber'
          },
          {
            title: 'Role',
            key: 'Role',
            dataIndex: 'Role'
          }
        ]}
      />
      <CreatePlan open={open} setOpen={setOpen} />
    </Main>
  );
};

export default Plan;
