'use client'

import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { Actions, Table, TableSkeleton } from '~/components';
import { useProjects } from '~/modules/projects';

import DropdownRender from './dropdown-render';

const List = () => {
  const { projects,isLoading } = useProjects();
  const { push } = useRouter();

  return isLoading ? (
    <TableSkeleton />
  ) :(
    <Table
      dataSource={projects}
      onRow={(record, rowIndex) => ({
        onClick: () => push(`/projects/${record.id}`)
      })}
      columns={[
        {
          title: 'Nomi',
          key: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Yaratilish vaqti',
          key: 'CreatedAt',
          dataIndex: 'createdAt',
          render: createdAt => <p>{dayjs(createdAt).format('DD.MM.YYYY')}</p>
        },
        {
          title: 'Boshlash vaqti',
          key: 'StartDate',
          dataIndex: 'startDate',
          render: startDate => <p>{dayjs(startDate).format('DD.MM.YYYY')}</p>
        },
        {
          title: 'Taxminiy qiymati',
          key: 'EstimatedCost',
          dataIndex: 'estimatedCost',
          render: (estimatedCost, record) => (
            <p>
              {estimatedCost} {record.currency}
            </p>
          )
        },
        {
          title: 'Sarflangan qiymat',
          key: 'SpentCost',
          dataIndex: 'spentCost',
          render: (spentCost, record) => (
            <p>
              {spentCost} {record.currency}
            </p>
          )
        },
        {
          title: 'Turi',
          key: 'Type',
          dataIndex: 'type',
          render: type => <p className=" capitalize">{type.toLowerCase()}</p>
        },
        {
          title: 'Tugash vaqti',
          key: 'EndDate',
          dataIndex: 'endDate',
          render: endDate => <p>{dayjs(endDate).format('DD.MM.YYYY') === '01.01.0001' ? '--' : dayjs(endDate).format('DD.MM.YYYY')}</p>
        },
        {
          title: '',
          key: 'Actions',
          dataIndex: 'id',
          render: (id, record) => <Actions dropdownRender={handleClose => <DropdownRender isEnded={record.isEnded} id={id} handleClose={handleClose} />} />
        }
      ]}
    />
  );
};

export default List;
