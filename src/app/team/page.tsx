'use client';

import { FC, useState } from 'react';

import { Actions, Button, CurrencySelect, Main } from '~/components';
import Table from '~/components/table/table';
import { useTeam } from '~/modules/team';
import { User } from '~/modules/team/types';

import { AddUpdateUser, DropdownRender } from './_components';

const Team: FC = () => {
  const [selectedUser, setSelectedUser] = useState<User>();
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
          {
            title: 'Ism familiya',
            key: 'fullName',
            dataIndex: 'fullName'
          },
          {
            title: 'Telefon raqami',
            key: 'phoneNumber',
            dataIndex: 'phoneNumber'
          },
          {
            title: 'Role',
            key: 'role',
            dataIndex: 'role'
          },
          {
            title: '',
            key: 'actions',
            render: record => (
              <Actions
                dropdownRender={handleClose => (
                  <DropdownRender
                    onEdit={() => {
                      setSelectedUser(record);
                      setOpen(true);
                    }}
                    userId={record.id}
                    handleClose={handleClose}
                  />
                )}
              />
            )
          }
        ]}
      />
      <AddUpdateUser open={open} setOpen={setOpen} user={selectedUser} onSuccess={() => setSelectedUser(undefined)} />
    </Main>
  );
};

export default Team;
