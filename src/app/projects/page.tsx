'use client';

import { FC, useState } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { Actions, Button, CurrencySelect, Main } from '~/components';
import Table from '~/components/table/table';
import { useProjects } from '~/modules/projects';

import { CreateProject, DropdownRender } from './_components';

const Projects: FC = () => {
  const { projects, isLoading } = useProjects();
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  if (isLoading) return <div className=" flex h-screen w-full items-center justify-center text-3xl font-medium">Loading...</div>;
  return (
    <Main>
      <div className="flex w-full items-center justify-between p-3">
        <p className="text-lg font-medium">Loyixalar</p>
        <div className=" flex w-max gap-2">
          <CurrencySelect />
          <Button intent="green" size="sm" className="w-max" onClick={() => setOpen(true)}>
            Loyixa yaratish
          </Button>
        </div>
      </div>
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
      <CreateProject open={open} setOpen={setOpen} />
    </Main>
  );
};

export default Projects;
