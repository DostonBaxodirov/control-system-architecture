import { useQuery } from '@tanstack/react-query';

import { http } from '~/services/config';

import { Plan } from '../types';

type Query = {
  plans: Plan[];
};

const usePlans = () => {
  const initialData: Query = { plans: [] };

  const { data = initialData, ...args } = useQuery({
    queryKey: ['PLANS'],
    queryFn: async () => {
      const { data } = await http.get<Plan[]>('/plan');

      return { plans: data };
    }
  });

  return { ...data, ...args };
};

export default usePlans;
