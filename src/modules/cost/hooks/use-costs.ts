import { useQuery } from '@tanstack/react-query';

import { useAuth } from '~/hooks';
import { http } from '~/services';

import * as Types from '../types';

type TQuery = {
  costs: Types.Cost[];
};

export const useCosts = ({ name, planId }: { name: string; planId: string }, notCurrentProjectId?: string) => {
  const { projectId } = useAuth();
  const initialData: TQuery = { costs: [] };

  const { data = initialData, ...args } = useQuery<unknown, string, TQuery>({
    queryKey: ['COSTS', notCurrentProjectId || projectId, name, planId],
    queryFn: async () => {
      const { data } = await http.post<Types.Cost[]>('/cost/list', { projectId: notCurrentProjectId || projectId, name, planId });

      return { costs: data || [] };
    },
    staleTime: 600000,
    retry: false
  });

  return { ...data, ...args };
};
