'use client';

import { FC, useState } from 'react';
import dayjs from 'dayjs';

import { Button, Main } from '~/components';
import Table from '~/components/table/table';
import { useProjects } from '~/modules/projects';

import CreateProject from './_components/create-project';

const Projects: FC = () => {
  const { projects, isLoading } = useProjects();
  const [open, setOpen] = useState(false);

  console.log('plans', projects);
  if (isLoading) return <div className=" flex h-screen w-full items-center justify-center text-3xl font-medium">Loading...</div>;
  return (
    <Main>
      <div className="flex w-full items-center justify-between p-3">
        <p className="text-lg font-medium">Loyixalar</p>
        <Button intent="default" size="sm" className="w-max" onClick={() => setOpen(true)}>
          Loyixa yaratish
        </Button>
      </div>
      <Table
        dataSource={projects}
        columns={[
          {
            title: 'Nomi',
            key: 'Name',
            dataIndex: 'name'
          },
          {
            title: 'Yaratilgan vaqti',
            key: 'CreatedAt',
            dataIndex: 'createdAt',
            render: createdAt => <p>{dayjs(createdAt).format('DD.MM.YYYY')}</p>
          },
          {
            title: 'Taxminiy qiymati',
            key: 'EstimatedCost',
            dataIndex: 'estimatedCost'
          },
          {
            title: 'Sarflangan qiymat',
            key: 'SpentCost',
            dataIndex: 'spentCost'
          },
          {
            title: 'Turi',
            key: 'Type',
            dataIndex: 'type',
            render:(type)=><p className=' capitalize'>{type.toLowerCase()}</p>
          }
        ]}
      />
      <CreateProject open={open} setOpen={setOpen} />
    </Main>
  );
};

export default Projects;
