'use client';

import { FC } from 'react';

import { CurrencySelect, Main } from '~/components';

import { CreatePlan, CreateSubPlan, List } from './_components';

const Plan: FC = () => (
  <Main>
    <div className="flex w-full items-center flex-wrap justify-between gap-4 p-3">
      <div className=" flex items-center justify-start gap-3">
        <p className="text-lg font-medium">Smeta</p>
        <CurrencySelect />
      </div>
      <div className=" flex w-max gap-2">
        <CreatePlan />
        <CreateSubPlan />
      </div>
    </div>
    <List />
  </Main>
);

export default Plan;
