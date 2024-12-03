import { useQuery } from '@tanstack/react-query';

import { http } from '~/services';

import * as Types from '../types';

type TQuery = {
  project: Types.Project;
};

const useSingle = (id: string) => {
  const initialData: TQuery = {} as TQuery;

  const { data = initialData, ...args } = useQuery<unknown, string, TQuery>({
    queryKey: ['PROJECTS', id],
    queryFn: async () => {
      const { data } = await http.get<Types.Project>(`/project/${id}`);

      return { project: data };
    },
    staleTime: 900000
  });

  return { ...data, ...args };
};

export default useSingle;
