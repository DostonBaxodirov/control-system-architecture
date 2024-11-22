'use client';

import { FC, useState } from 'react';
import { useParams } from 'next/navigation';

import { Button, CurrencySelect, Main } from '~/components';
import { UpdatePlan } from '~/modules/plans/forms';
import { useSingle } from '~/modules/plans/hooks';
import { useSubPlans } from '~/modules/subPlan/hooks';

import { CreateSubPlan } from '../_components';

import { Info, SubPlanTable } from './_components';

const Single: FC<{}> = () => {
  const params = useParams();
  const { plan } = useSingle(params.id as string);
  const { subPlans } = useSubPlans(params.id as string);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Main>
      <div className="flex w-full items-center gap-2 justify-between p-3 flex-wrap">
        <p className="text-lg font-medium">{plan.name}</p>
        <div className=" flex w-full gap-2 overflow-auto">
          <CurrencySelect />
          <Button intent="default" size="sm" className="w-max" onClick={() => setOpen(true)}>
            Reja Qo'shish
          </Button>
          {plan.status?.value !== 'COMPLETED' && (
            <UpdatePlan
              setLoading={setLoading}
              planId={plan.id}
              status={plan.status?.value === 'CREATED' ? 'IN_PROGRESS' : 'COMPLETED'}
              children={onClick => (
                <Button intent="green" loading={loading} size="sm" className="w-max" onClick={onClick}>
                  {plan.status?.value === 'CREATED' ? 'Ish boshlash' : 'Yakunlash'}
                </Button>
              )}
            />
          )}
        </div>
      </div>
      <Info plan={plan} />
      <SubPlanTable subPlans={subPlans} />
      <CreateSubPlan open={open} setOpen={setOpen} planId={plan.id} />
    </Main>
  );
};

export default Single;
