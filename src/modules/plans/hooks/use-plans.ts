import { useQuery } from '@tanstack/react-query';

import { useAuth } from '~/hooks';
import { http } from '~/services/config';

import * as Mapper from '../mapper';
import { Plan } from '../types';

type Query = {
  plans: Plan[];
};

const usePlans = () => {
  const initialData: Query = { plans: [] };
  const { userId, projectId } = useAuth();
  const { data = initialData, ...args } = useQuery({
    queryKey: ['PLANS'],
    queryFn: async () => {
      const { data } = await http.post<Plan[]>('/plan/list', { userId, projectId });

      const plans = (data || []).map(Mapper.Plan);

      console.log('plans', plans);

      return { plans };
    },
    staleTime:600000,
    retry:false
  });

  return { ...data, ...args };
};

export default usePlans;
