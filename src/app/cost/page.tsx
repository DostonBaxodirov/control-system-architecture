import { FC } from 'react';

import { CurrencySelect, Main } from '~/components';
import { Filter } from '~/components/filter/filter';

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
    <div className=' w-full flex flex-col gap-4'>

    <Filter page="cost" />
    <List />
    </div>
  </Main>
);

export default Plan;
