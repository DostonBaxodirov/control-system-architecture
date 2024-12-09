'use client';

import { FC } from 'react';

import { Actions, Table, TableSkeleton } from '~/components';
import { useTeam } from '~/modules/team';

import DropdownRender from './dropdown-render';

const List: FC = () => {
  const { isLoading, users } = useTeam();

  return isLoading ? (
    <TableSkeleton />
  ) : (
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
          render: record => <Actions disabled={record.role === 'OWNER'} dropdownRender={handleClose => <DropdownRender user={record} handleClose={handleClose} />} />
        }
      ]}
    />
  );
};

export default List;
