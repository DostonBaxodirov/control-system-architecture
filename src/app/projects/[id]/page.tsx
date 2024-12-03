'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';

import { Actions, CurrencySelect, Main } from '~/components';
import Tag from '~/components/tag/tag';
import { useSingle } from '~/modules/projects';

import { DropdownRender } from '../_components';

import { Info } from './components';

const SingleProject: FC = () => {
  const params = useParams();
  const { project } = useSingle(params.id as string);

  return (
    <Main>
      <div className="flex w-full flex-wrap items-center justify-between gap-2 p-3">
        <div className=' w-max flex justify-start gap-3 items-center'>
          <p className="text-lg font-medium">{project?.name}</p>
          <Tag color={project?.isEnded ? 'green' : 'yellow'}>{project?.isEnded ? 'Tugallangan' : 'Tugallanmagan'}</Tag>
        </div>
        <div className=" flex w-max gap-2 overflow-auto">
          <CurrencySelect />
          <Actions dropdownRender={handleClose => <DropdownRender isEnded={project.isEnded} id={project.id} handleClose={handleClose} />} />
        </div>
      </div>

      <Info project={project} />
    </Main>
  );
};

export default SingleProject;
