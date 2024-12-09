'use client';

import { FC, useState } from 'react';

import { Button, CurrencySelect } from '~/components';
import { useAuth } from '~/hooks';
import { UpdatePlan } from '~/modules/plans/forms';
import { useSingle } from '~/modules/plans/hooks';

import { CreateSubPlan } from '../../_components';

type TopBarProps = {
  id: string;
};

const TopBar: FC<TopBarProps> = ({ id }) => {
  const { plan } = useSingle(id);
  const { currentProject } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 p-3">
      <div className=" flex justify-between gap-3 items-center">
        <p className="text-lg font-medium ">{plan.name}</p>
        <CurrencySelect />
      </div>
      <div className=" flex w-full gap-2 overflow-auto">
        {plan.status?.value !== 'COMPLETED' && (
          <>
            <CreateSubPlan planId={id} />
            <UpdatePlan
              setLoading={setLoading}
              planId={plan.id}
              status={plan.status?.value === 'CREATED' ? 'IN_PROGRESS' : 'COMPLETED'}
              children={onClick => (
                <Button disabled={currentProject?.isEnded} intent="green" loading={loading} size="sm" className="w-max" onClick={onClick}>
                  {plan.status?.value === 'CREATED' ? 'Ish boshlash' : 'Yakunlash'}
                </Button>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
