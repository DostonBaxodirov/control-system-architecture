import { usePlans } from '~/modules/plans/hooks';

export const usePlanOptions = (): { label: string; value: string }[] => {
  const { plans } = usePlans();

  return plans.map(item => ({ label: item.name, value: item.id }));
};
