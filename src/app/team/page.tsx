import { FC } from 'react';

import { CurrencySelect, Main } from '~/components';

import { AddUpdateUser, List } from './_components';

const Team: FC = () => (
  <Main>
    <div className="flex w-full items-center justify-between p-3">
      <p className="text-lg font-medium">Jamoa</p>
      <div className=" flex w-max gap-2">
        <CurrencySelect />
        <AddUpdateUser type="add" />
      </div>
    </div>
    <List />
  </Main>
);

export default Team;
