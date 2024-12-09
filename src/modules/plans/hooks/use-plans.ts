import { useQuery } from '@tanstack/react-query';

import { useAuth } from '~/hooks';
import { http } from '~/services/config';

import * as Mapper from '../mapper';
import { Plan } from '../types';

type Query = {
  plans: Plan[];
};

// type Props = {
//   filter: { name: string; status: string };
//   notCurrentProjectId?: string;
// };

const usePlans = ({ name, status }: { name: string; status: string }, notCurrentProjectId?: string) => {
  const initialData: Query = { plans: [] };
  const { userId, projectId } = useAuth();
  const { data = initialData, ...args } = useQuery({
    queryKey: ['PLANS', notCurrentProjectId! || projectId, { name, status }],
    queryFn: async () => {
      const { data } = await http.post<Plan[]>('/plan/list', {
        userId,
        projectId: notCurrentProjectId! || projectId,
        filter: { name, status: status === 'ALL' ? '' : status }
      });

      const plans = (data || []).map(Mapper.Plan);

      return { plans };
    },
    staleTime: 600000,
    retry: false,
    enabled: !!projectId
  });

  return { ...data, ...args };
};

export default usePlans;
