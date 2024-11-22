import { useQuery } from '@tanstack/react-query';

import { http } from '~/services';

import { Plan } from '../mapper';
import * as Types from '../types';

type TQuery = {
  plan: Types.Plan;
};

const useSingle = (id: string) => {
  const initialData: TQuery = { plan: {} as Types.Plan };
  
  const { data = initialData, ...args } = useQuery<unknown, string, TQuery>({
    queryKey: ['PLANS', id],
    queryFn: async () => {
      const { data } = await http.get(`/plan/${id}`);

      const plan = Plan(data);

      return { plan };
    }
  });

  return { ...data, ...args };
};

export default useSingle;
