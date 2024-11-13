import { useQuery } from '@tanstack/react-query';

import { http } from '~/services';

import * as Mapper from '../mapper';
import * as Types from '../types';

type TQuery = {
  subPlans: Types.SubPlan[];
};

const useSubPlans = (planId: string) => {
  const initialData: TQuery = { subPlans: [] };

  const { data = initialData, ...args } = useQuery<unknown, string, TQuery>({
    queryKey: ['SUBPLANS', planId],
    queryFn: async () => {
      const { data } = await http.get<any[]>(`/subPlan/${planId}`);

      const subPlans = (data || []).map(Mapper.SubPlan);

      return { subPlans };
    },
    enabled: !!planId
  });

  return { ...data, ...args };
};

export default useSubPlans;
