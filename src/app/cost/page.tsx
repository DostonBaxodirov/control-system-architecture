import { FC } from 'react';

import { CurrencySelect, Main } from '~/components';

import { CreateCost, List } from './_components';

const Plan: FC = () => (
  <Main>
    <div className="flex w-full items-center justify-between p-3">
      <p className="text-lg font-medium">Xarajatlar</p>
      <div className=" flex w-max gap-2">
        <CurrencySelect />
        <CreateCost />
      </div>
    </div>
    <List />
  </Main>
);

export default Plan;
