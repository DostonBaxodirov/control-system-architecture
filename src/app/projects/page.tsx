import { FC } from 'react';

import { CurrencySelect, Main } from '~/components';

import { CreateProject, List } from './_components';

const Projects: FC = () => (
  <Main>
    <div className="flex w-full items-center flex-wrap justify-between gap-4 p-3">
      <p className="text-lg font-medium">Loyixalar</p>
      <div className=" flex w-max gap-2">
        <CurrencySelect />
        <CreateProject />
      </div>
    </div>
    <List />
  </Main>
);

export default Projects;
