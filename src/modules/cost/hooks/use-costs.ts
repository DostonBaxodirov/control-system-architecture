import { useQuery } from '@tanstack/react-query';

import { useAuth } from '~/hooks';
import { http } from '~/services';

import * as Types from '../types';

type TQuery = {
  costs: Types.Cost[];
};

export const useCosts = (notCurrentProjectId?: string) => {
  const { projectId } = useAuth();
  const initialData: TQuery = { costs: [] };

  const { data = initialData, ...args } = useQuery<unknown, string, TQuery>({
    queryKey: ['COSTS', notCurrentProjectId || projectId],
    queryFn: async () => {
      const { data } = await http.post<Types.Cost[]>('/cost/list', { projectId: notCurrentProjectId || projectId });

      return { costs: data||[] };
    },
    staleTime: 600000,
    retry: false
  });

  return { ...data, ...args };
};
