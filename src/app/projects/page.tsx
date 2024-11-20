'use client';

import { FC, useState } from 'react';
import dayjs from 'dayjs';

import { Button, CurrencySelect, Main } from '~/components';
import Table from '~/components/table/table';
import { useProjects } from '~/modules/projects';

import CreateProject from './_components/create-project';
import { ProjectCompletion } from '~/modules/projects/forms';

const Projects: FC = () => {
  const { projects, isLoading } = useProjects();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (isLoading) return <div className=" flex h-screen w-full items-center justify-center text-3xl font-medium">Loading...</div>;
  return (
    <Main>
      <div className="flex w-full items-center justify-between p-3">
        <p className="text-lg font-medium">Loyixalar</p>
        <div className=" flex w-max gap-2">
          <CurrencySelect />
          <Button intent="default" size="sm" className="w-max" onClick={() => setOpen(true)}>
            Loyixa yaratish
          </Button>
        </div>
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
            render: id => (
              <ProjectCompletion
                setLoading={setLoading}
                id={id}
                children={onClick => (
                  <Button intent="default" loading={loading} onClick={onClick} size="sm" className="w-max">
                    Tugatish
                  </Button>
                )}
              />
            )
          }
        ]}
      />
      <CreateProject open={open} setOpen={setOpen} />
    </Main>
  );
};

export default Projects;
