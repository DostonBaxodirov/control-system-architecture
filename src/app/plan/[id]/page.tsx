'use client';

import { FC, useState } from 'react';
import { useParams } from 'next/navigation';

import { Button, CurrencySelect, Main } from '~/components';
import { useAuth } from '~/hooks';
import { UpdatePlan } from '~/modules/plans/forms';
import { useSingle } from '~/modules/plans/hooks';
import { useSubPlans } from '~/modules/subPlan/hooks';

import { CreateSubPlan } from '../_components';

import { Info, SubPlanTable } from './_components';

const Single: FC<{}> = () => {
  const params = useParams();
  const { plan } = useSingle(params.id as string);
  const { subPlans } = useSubPlans(params.id as string);
  const { currentProject } = useAuth();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <Main>
      <div className="flex w-full flex-wrap items-center justify-between gap-2 p-3">
        <p className="text-lg font-medium">{plan.name}</p>
        <div className=" flex w-full gap-2 overflow-auto">
          <CurrencySelect />
          {plan.status?.value !== 'COMPLETED' && (
            <>
              <Button disabled={currentProject.isEnded} intent="default" size="sm" className="w-max" onClick={() => setOpen(true)}>
                Reja Qo'shish
              </Button>
              <UpdatePlan
                setLoading={setLoading}
                planId={plan.id}
                status={plan.status?.value === 'CREATED' ? 'IN_PROGRESS' : 'COMPLETED'}
                children={onClick => (
                  <Button disabled={currentProject.isEnded} intent="green" loading={loading} size="sm" className="w-max" onClick={onClick}>
                    {plan.status?.value === 'CREATED' ? 'Ish boshlash' : 'Yakunlash'}
                  </Button>
                )}
              />
            </>
          )}
        </div>
      </div>
      <Info plan={plan} />
      <SubPlanTable disabled={currentProject.isEnded} subPlans={subPlans} planStatus={plan?.status?.value} />
      <CreateSubPlan open={open} setOpen={setOpen} planId={plan.id} />
    </Main>
  );
};

export default Single;
