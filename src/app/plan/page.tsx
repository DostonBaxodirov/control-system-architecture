'use client'

import { FC } from 'react';

import { Button, Main } from '~/components';
import Table from '~/components/table/table';
import usePlans from '~/modules/plans/hooks/use-plans';

const Plan: FC = () => {
  const { plans, isLoading } = usePlans();

  console.log('plans', plans);
  if (isLoading) return <div className=" flex h-screen w-full items-center justify-center text-3xl font-medium">Loading...</div>;
  return (
    <Main>
      <div className="flex w-full items-center justify-between p-3">
        <p className="text-lg font-medium">Jamoa</p>
        <Button intent="default" size="sm" className="w-max">
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
    </Main>
  );
};

export default Plan;
