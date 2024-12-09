import { FC } from 'react';

import { CurrencySelect, Main } from '~/components';
import { Filter } from '~/components/filter/filter';

import { CreatePlan, CreateSubPlan, List } from './_components';

interface PlanProps {
}

const Plan: FC<PlanProps> = () => (
  <Main>
    <div className="flex w-full flex-wrap items-center justify-between gap-4 p-3">
      <div className=" flex items-center justify-start gap-3">
        <p className="text-lg font-medium">Smeta</p>
        <CurrencySelect />
      </div>
      <div className=" flex w-max gap-2">
        <CreatePlan />
        <CreateSubPlan />
      </div>
      <Filter page='plan' />
    </div>
    <List />
  </Main>
);

export default Plan;
