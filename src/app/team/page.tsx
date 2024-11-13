'use client';

import { FC, useState } from 'react';

import { Button, CurrencySelect, Main } from '~/components';
import Table from '~/components/table/table';
import { useTeam } from '~/modules/team';

import { AddUser } from './_components';

const Team: FC = () => {
  const { isLoading, users } = useTeam();
  const [open, setOpen] = useState(false);

  if (isLoading) return <div className=" flex h-screen w-full items-center justify-center text-3xl font-medium">Loading...</div>;
  return (
    <Main>
      <div className="flex w-full items-center justify-between p-3">
        <p className="text-lg font-medium">Jamoa</p>
        <div className=" flex w-max gap-2">
          <CurrencySelect />
          <Button intent="default" size="sm" className="w-max" onClick={() => setOpen(true)}>
            Qo'shish
          </Button>
        </div>
      </div>
      <Table
        dataSource={users}
        columns={[
          // {
          //   title: 'Id',
          //   key: 'ID',
          //   dataIndex: 'ID'
          // },
          {
            title: 'Ism familiya',
            key: 'FullName',
            dataIndex: 'FullName'
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
      <AddUser open={open} setOpen={setOpen} />
    </Main>
  );
};

export default Team;
