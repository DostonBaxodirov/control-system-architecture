'use client';

import { FC } from 'react';

import { Button, Main } from '~/components';
import Table from '~/components/table/table';
import { useTeam } from '~/modules/team';

const Team: FC = () => {
  const { isLoading, users } = useTeam();

  if (isLoading) return <div className=" flex h-screen w-full items-center justify-center text-3xl font-medium">Loading...</div>;
  return (
    <Main>
      <div className="w-full flex justify-between items-center p-3">
        <p className='text-lg font-medium'>Jamoa</p>
        <Button intent='default' size='sm' className='w-max'>Qo'shish</Button>
      </div>
      <Table
        dataSource={users}
        columns={[
          {
            title: 'Id',
            key: 'ID',
            dataIndex: 'ID'
          },
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
          },
        ]}
      />
    </Main>
  );
};

export default Team;
