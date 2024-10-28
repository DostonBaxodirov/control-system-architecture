import { useQuery } from '@tanstack/react-query';

import useAuth from '~/hooks/use-auth';
import { http } from '~/services';

import * as Mapper from '../mapper';
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
      const { data } = await http.get<any[]>(`/user-projects/${userId}`);

      const projects = data.map(Mapper.Project);

      return { projects };
    },
    staleTime: 900000
  });

  return { ...data, ...args };
};

export default useProjects;
