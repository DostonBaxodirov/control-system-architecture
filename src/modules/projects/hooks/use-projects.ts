import { useQuery } from '@tanstack/react-query';

import { useAuth } from '~/hooks';
import { http } from '~/services';

import * as Types from '../types';

type TQuery = {
  projects: Types.Project[];
};

const useProjects = () => {
  const { userId } = useAuth();
  const initialData: TQuery = { projects: [] };

  const { data = initialData, ...args } = useQuery<unknown, string, TQuery>({
    queryKey: ['PROJECTS'],
    queryFn: async () => {
      const { data } = await http.get<Types.Project[]>(`/user-projects/${userId}`);

      return { projects: data };
    },
    staleTime: 900000
  });

  return { ...data, ...args };
};

export default useProjects;
