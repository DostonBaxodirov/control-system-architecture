import { useSearchParams } from 'next/navigation';

import { usePlans } from '~/modules/plans/hooks';

export const usePlanOptions = (): { label: string; value: string }[] => {
  const searchParams = useSearchParams();
  const { plans } = usePlans({ status: searchParams.get('status') || '', name: searchParams.get('planName') || '' });

  return plans.map(item => ({ label: item.name, value: item.id }));
};
