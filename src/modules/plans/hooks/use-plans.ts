import { useQuery } from '@tanstack/react-query';

import useAuth from '~/hooks/use-auth';
import { http } from '~/services/config';

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

      return { plans: data };
    }
  });

  return { ...data, ...args };
};

export default usePlans;
